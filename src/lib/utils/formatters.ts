import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency to Indian Rupee (₹) or USD ($)
 */
export function formatCurrency(amount: number, currency: 'INR' | 'USD' = 'INR'): string {
  if (currency === 'INR') {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Calculate Total Landed Cost
 * Total Landed Cost = (Unit Price * Quantity) + Shipping Cost + Taxes - Discount
 */
export function calculateTotalLandedCost(params: {
  unitPrice: number;
  quantity: number;
  shippingCost?: number;
  taxCost?: number;
  discountAmount?: number;
}): {
  baseCost: number;
  shippingCost: number;
  taxCost: number;
  discountAmount: number;
  totalLandedCost: number;
  effectiveUnitPrice: number;
} {
  const baseCost = params.unitPrice * params.quantity;
  const shippingCost = params.shippingCost || 0;
  const taxCost = params.taxCost || baseCost * 0.18; // Default 18% GST if omitted
  const discountAmount = params.discountAmount || 0;
  const totalLandedCost = baseCost + shippingCost + taxCost - discountAmount;
  const effectiveUnitPrice = params.quantity > 0 ? totalLandedCost / params.quantity : 0;

  return {
    baseCost,
    shippingCost,
    taxCost,
    discountAmount,
    totalLandedCost,
    effectiveUnitPrice,
  };
}

/**
 * Multi-Factor Vendor Scoring Engine
 * Weights: Price (35%), Delivery (20%), Quality (15%), Warranty (10%), Risk (10%), Past Perf (5%), Sustainability (5%)
 */
export interface ScoreWeights {
  priceWeight: number; // e.g. 0.35
  deliveryWeight: number; // e.g. 0.20
  qualityWeight: number; // e.g. 0.15
  warrantyWeight: number; // e.g. 0.10
  riskWeight: number; // e.g. 0.10
  pastPerfWeight: number; // e.g. 0.05
  sustainabilityWeight: number; // e.g. 0.05
}

export const DEFAULT_SCORE_WEIGHTS: ScoreWeights = {
  priceWeight: 0.35,
  deliveryWeight: 0.20,
  qualityWeight: 0.15,
  warrantyWeight: 0.10,
  riskWeight: 0.10,
  pastPerfWeight: 0.05,
  sustainabilityWeight: 0.05,
};

export function calculateVendorScore(
  quote: {
    unitPrice: number;
    deliveryDays: number;
    warrantyMonths: number;
    totalLandedCost: number;
  },
  supplier: {
    qualityScore: number; // 0 - 100
    riskScore: number; // 0 - 100 (lower is better)
    deliveryScore: number; // 0 - 100
    sustainabilityScore: number; // 0 - 100
  },
  targetRequirement: {
    targetUnitPrice: number;
    requiredDeliveryDays: number;
    requiredWarrantyMonths?: number;
  },
  customWeights: ScoreWeights = DEFAULT_SCORE_WEIGHTS
) {
  // 1. Price Score (35%)
  const targetPrice = targetRequirement.targetUnitPrice;
  const priceDiffRatio = (targetPrice - quote.unitPrice) / targetPrice;
  let rawPriceScore = 70 + priceDiffRatio * 100;
  rawPriceScore = Math.max(0, Math.min(100, rawPriceScore));
  const weightedPriceScore = rawPriceScore * customWeights.priceWeight;

  // 2. Delivery Score (20%)
  const reqDays = targetRequirement.requiredDeliveryDays;
  let rawDeliveryScore = 100;
  if (quote.deliveryDays > reqDays) {
    rawDeliveryScore = Math.max(0, 100 - (quote.deliveryDays - reqDays) * 10);
  } else {
    rawDeliveryScore = Math.min(100, 90 + (reqDays - quote.deliveryDays) * 2);
  }
  const weightedDeliveryScore = rawDeliveryScore * customWeights.deliveryWeight;

  // 3. Quality Score (15%)
  const rawQualityScore = supplier.qualityScore || 85;
  const weightedQualityScore = rawQualityScore * customWeights.qualityWeight;

  // 4. Warranty Score (10%)
  const reqWarranty = targetRequirement.requiredWarrantyMonths || 12;
  const rawWarrantyScore = Math.min(100, (quote.warrantyMonths / reqWarranty) * 80);
  const weightedWarrantyScore = rawWarrantyScore * customWeights.warrantyWeight;

  // 5. Risk Score (10%) -> Invert risk (100 - riskScore)
  const rawRiskSafetyScore = Math.max(0, 100 - (supplier.riskScore || 20));
  const weightedRiskScore = rawRiskSafetyScore * customWeights.riskWeight;

  // 6. Past Performance Score (5%)
  const rawPastPerfScore = supplier.deliveryScore || 85;
  const weightedPastPerfScore = rawPastPerfScore * customWeights.pastPerfWeight;

  // 7. Sustainability Score (5%)
  const rawSustScore = supplier.sustainabilityScore || 80;
  const weightedSustScore = rawSustScore * customWeights.sustainabilityWeight;

  const totalCompositeScore =
    weightedPriceScore +
    weightedDeliveryScore +
    weightedQualityScore +
    weightedWarrantyScore +
    weightedRiskScore +
    weightedPastPerfScore +
    weightedSustScore;

  return {
    rawPriceScore: Number(rawPriceScore.toFixed(1)),
    weightedPriceScore: Number(weightedPriceScore.toFixed(1)),
    rawDeliveryScore: Number(rawDeliveryScore.toFixed(1)),
    weightedDeliveryScore: Number(weightedDeliveryScore.toFixed(1)),
    rawQualityScore: Number(rawQualityScore.toFixed(1)),
    weightedQualityScore: Number(weightedQualityScore.toFixed(1)),
    rawWarrantyScore: Number(rawWarrantyScore.toFixed(1)),
    weightedWarrantyScore: Number(weightedWarrantyScore.toFixed(1)),
    rawRiskSafetyScore: Number(rawRiskSafetyScore.toFixed(1)),
    weightedRiskScore: Number(weightedRiskScore.toFixed(1)),
    rawPastPerfScore: Number(rawPastPerfScore.toFixed(1)),
    weightedPastPerfScore: Number(weightedPastPerfScore.toFixed(1)),
    rawSustScore: Number(rawSustScore.toFixed(1)),
    weightedSustScore: Number(weightedSustScore.toFixed(1)),
    compositeScore: Number(totalCompositeScore.toFixed(1)),
  };
}
