from abc import ABC, abstractmethod

from backend.backend_proxy.feedback.feedback_class import Feedback


class AbstractFeedbackController(ABC):

    @abstractmethod
    def __init__(self) -> None: pass

    @abstractmethod
    def create_feedback(self, feedback: dict) -> bool: pass

    @abstractmethod
    def get_feedback(self, feedback_id: str) -> Feedback: pass

    @abstractmethod
    def get_all_feedbacks(self) -> list[Feedback]: pass

    @abstractmethod
    def dump_feedback(self, feedback: Feedback) -> dict: pass

