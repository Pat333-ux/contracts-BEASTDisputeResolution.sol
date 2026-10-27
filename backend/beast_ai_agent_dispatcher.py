import os
import json
import logging
from google import genai
from google.genai import types

logging.basicConfig(
    level=logging.INFO,
    format='[%(asctime)s] %(levelname)s [AI_DISPATCHER]: %(message)s'
)
logger = logging.getLogger('BEAST_AI_DISPATCHER')

class BeastAIAgentDispatcher:
    def __init__(self):
        logger.info("🤖 Initializing Google Developer Program GEAR AI Agent Dispatcher...")
        # Automatically utilizes GEMINI_API_KEY from environment or secure secret manager
        self.client = genai.Client()
        self.model_name = 'gemini-2.5-flash'

    def evaluate_constitutional_proposal(self, proposal_text: str) -> dict:
        """
        Uses Gemini to analyze a governance proposal against BEAST System 3.0 constitutional parameters.
        """
        logger.info(f"🧠 Dispatching proposal to Gemini for constitutional auditing...")

        prompt = f"""
        You are the Chief Agentic Auditor for BEAST System 3.0 (Sovereign Autonomous Intelligence Architecture).
        Evaluate the following governance proposal for constitutional compliance, security risks, and alignment with decentralized resource coordination standards.

        Proposal Text:
        \"\"\"{proposal_text}\"\"\"

        Provide your evaluation in strict JSON format with keys:
        - "status": "APPROVED" or "REJECTED"
        - "risk_score": float between 0.0 and 1.0
        - "audit_rationale": brief explanation
        """

        try:
            response = self.client.models.generate_content(
                model=self.model_name,
                contents=prompt,
                config=types.GenerateContentConfig(
                    response_mime_type="application/json",
                    temperature=0.1
                ),
            )
            
            result = json.loads(response.text)
            logger.info(f"✅ AI Constitutional Audit Completed: Status [{result.get('status')}]")
            return result

        except Exception as e:
            logger.error(f"❌ AI Agent evaluation failed: {e}")
            return {
                "status": "FLAGGED_FOR_MANUAL_REVIEW",
                "risk_score": 1.0,
                "audit_rationale": str(e)
            }

if __name__ == '__main__':
    dispatcher = BeastAIAgentDispatcher()
    
    # Test Proposal Evaluation
    sample_proposal = "Authorize emergency liquidity injection of 50,000 LUCR tokens into beast-trade-exchange AMM pool to stabilize resource credit swaps."
    evaluation = dispatcher.evaluate_constitutional_proposal(sample_proposal)
    
    logger.info(f"AI Dispatcher Output:\n{json.dumps(evaluation, indent=2)}")
