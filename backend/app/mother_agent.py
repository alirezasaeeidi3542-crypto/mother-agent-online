import uuid

class MotherAgent:
    def __init__(self):
        self.children = {}

    def create_child_agent(self, config: dict):
        child_id = str(uuid.uuid4())
        self.children[child_id] = config
        # اینجا می‌توانیم Child Agent واقعی را راه‌اندازی کنیم
        return child_id
