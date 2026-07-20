import React, { useState, useEffect } from "react";
import "../static/ModalTransac.css";

const INITIAL_FORM_STATE = {
    name: "",
    description: "",
    amount: "",
    remaining_amount: "",
    card_number: "",
    expiry_date: "",
    is_active: true,
};

function CouponModal({ isOpen, onClose, onSave, initialData }) {
    const [formData, setFormData] = useState(INITIAL_FORM_STATE);

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...INITIAL_FORM_STATE,
                ...initialData,
                amount: initialData.amount ?? "",
                remaining_amount: initialData.remaining_amount ?? "",
            });
        } else {
            setFormData(INITIAL_FORM_STATE);
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button type="button" className="close-btn" onClick={onClose}>✕</button>

                <form onSubmit={handleSubmit}>
                    <input
                        className="form-input"
                        name="name"
                        placeholder="Coupon name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        className="form-input"
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                    />

                    <input
                        className="form-input"
                        name="amount"
                        type="number"
                        placeholder="Amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                    />

                    <input
                        className="form-input"
                        name="remaining_amount"
                        type="number"
                        placeholder="Remaining amount"
                        value={formData.remaining_amount}
                        onChange={handleChange}
                    />

                    <input
                        className="form-input"
                        name="card_number"
                        placeholder="Card number"
                        value={formData.card_number}
                        onChange={handleChange}
                    />

                    <input
                        className="form-input"
                        name="expiry_date"
                        type="date"
                        value={formData.expiry_date}
                        onChange={handleChange}
                    />

                    <label className="checkbox-row">
                        <input
                            type="checkbox"
                            name="is_active"
                            checked={formData.is_active}
                            onChange={handleChange}
                        />
                        Active coupon
                    </label>

                    <button type="submit">{initialData ? "Save Changes" : "Add Coupon"}</button>
                </form>
            </div>
        </div>
    );
}

export default CouponModal;
