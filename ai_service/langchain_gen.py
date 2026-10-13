import os
from langchain.chat_models import ChatOpenAI
from langchain.schema import HumanMessage, SystemMessage

class RemediationGenerator:
    def __init__(self):
        # Fallback to empty string for local testing if no key is provided
        api_key = os.getenv("OPENAI_API_KEY", "")
        # Only initialize if a valid key could be obtained
        if api_key:
            self.llm = ChatOpenAI(temperature=0.2, openai_api_key=api_key)
        else:
            self.llm = None

    def generate_playbook(self, threat_vector: str, context: str) -> str:
        """
        Uses an LLM via LangChain to generate an actionable remediation 
        playbook based on the predicted attack vector.
        """
        if not self.llm:
            return f"Mock Playbook for {threat_vector}: [LLM Not Configured] Block IP, update WAF rules."

        messages = [
            SystemMessage(content="You are a senior cybersecurity incident response AI. " 
                                  "Provide a structured, three-step remediation playbook for the predicted attack vector. "
                                  "Keep it concise and actionable."),
            HumanMessage(content=f"Threat Vector: {threat_vector}\nContext Data: {context}")
        ]

        try:
            response = self.llm(messages)
            return response.content
        except Exception as e:
            return f"Error generating automated response: {str(e)}"
