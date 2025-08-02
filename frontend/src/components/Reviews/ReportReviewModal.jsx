import { useState } from "react"
import Modal from "react-modal"
import { toast } from "react-toastify";

const ReportReviewModal = ({ isOpen, onClose, book_id, review_id, onRefresh }) => {
  const [reason, setReason] = useState("");
  const [text, setText] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = async(e) => {
    e.preventDefault();
    const reportData = {
        reason: reason, 
        desc: text,
    }

    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/genbook/${book_id}/review/${review_id}/report`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(reportData),
    })
    const data = await res.json();
    if (data.success) {
        toast.success(data.message);
    } else {
      toast.error(data.message);
    }
    onClose();
    onRefresh();
    setReason("");
    setText("");
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Report Review"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          zIndex: 9999,
        },
        content: {
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          zIndex: 10000,
          maxWidth: '500px',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
        },
      }}
    >
      <h2 className="text-lg font-bold !mb-4">Report</h2>
      <form onSubmit={handleSubmit}> 
        {/* Input field for doubt title */}
        <input 
        type="text" 
        onChange={(e) => setReason(e.target.value)}
        placeholder='Type your report reason here...'
        className="w-full !p-2 border rounded !mb-4"
        />
        {/* Textarea for doubt description */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your report description here..."
          className="w-full !p-2 border rounded !mb-4"
          rows="5"
        ></textarea>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="!px-4 !py-2 !bg-white rounded hover:!bg-blue-500 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="!px-4 !py-2 !bg-white rounded hover:!bg-blue-500 hover:text-white"
          >
            Post
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default ReportReviewModal
