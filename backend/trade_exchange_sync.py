import os
import json
import logging

logging.basicConfig(
    level=logging.INFO,
    format='[%(asctime)s] %(levelname)s [TRADE_EXCHANGE]: %(message)s'
)
logger = logging.getLogger('BEAST_TRADE_SERVICE')

class TradeExchangeSyncService:
    def __init__(self):
        logger.info("💹 Initializing BEAST Trade Exchange & AMM Pricing Service...")

    def calculate_swap_output(self, lucr_in: float, lucr_reserve: float, credit_reserve: float) -> dict:
        """
        Calculates constant product AMM swap output and price impact.
        """
        logger.info(f"🧮 Calculating swap rate for {lucr_in} LUCR...")
        
        if lucr_reserve <= 0 or credit_reserve <= 0:
            return {"error": "Insufficient pool reserves"}

        fee = lucr_in * 0.003
        lucr_in_net = lucr_in - fee
        
        numerator = credit_reserve * lucr_in_net
        denominator = lucr_reserve + lucr_in_net
        credits_out = numerator / denominator

        price_impact = (lucr_in_net / (lucr_reserve + lucr_in_net)) * 100

        logger.info(f"✅ Swap computed: {credits_out:.4f} credits out | Impact: {price_impact:.2f}%")
        return {
            "credits_out": round(credits_out, 4),
            "fee_paid": round(fee, 4),
            "price_impact_pct": round(price_impact, 2)
        }

if __name__ == '__main__':
    service = TradeExchangeSyncService()
    
    # Test AMM calculation
    result = service.calculate_swap_output(1000.0, 50000.0, 200000.0)
    logger.info(f"Trade Service Output: {json.dumps(result, indent=2)}")
