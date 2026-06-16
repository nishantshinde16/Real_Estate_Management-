import { useEffect, useState } from "react";
import {
  getFeedbacks,
  updateFeedbackStatus,
  deleteFeedback,
} from "../../services/feedbackService";

function FeedbackManagement() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    loadFeedbacks();
  }, []);

  const loadFeedbacks = async () => {
    const response = await getFeedbacks();
    setFeedbacks(response.data);
  };
  const handleStatus = async (id, status) => {
  await updateFeedbackStatus(id, status);
  loadFeedbacks();
};

const handleDelete = async (id) => {
  await deleteFeedback(id);
  loadFeedbacks();
};

  return (
    <section className="section">
      <h1>Feedback Management</h1>

      {feedbacks.map((item) => (
        <div
          key={item._id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "10px",
          }}
        >
          <h3>{item.name}</h3>

          <p>{item.feedback}</p>

          <p>{"⭐".repeat(item.rating)}</p>

<strong>Status: {item.status}</strong>

<div style={{ marginTop: "10px" }}>
<button
  type="button"
  onClick={() => handleStatus(item._id, "Approved")}
>
  Approve
</button>

 <button
  type="button"
  style={{ marginLeft: "10px" }}
  onClick={() => handleStatus(item._id, "Rejected")}
>
  Reject
</button>

  <button
  type="button"
  style={{ marginLeft: "10px" }}
  onClick={() => handleDelete(item._id)}
>
  Delete
</button>
</div>
        </div>
      ))}
    </section>
  );
}

export default FeedbackManagement;