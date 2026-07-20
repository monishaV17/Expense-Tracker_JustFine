import React, { useState } from "react";
import "../static/Coupons.css";
import CouponModal from "./CouponModal";

const INITIAL_COUPONS = [
    {
        id: 1,
        name: "Amazon Gift Card",
        description: "Birthday gift",
        amount: 2000,
        remaining_amount: 500,
        card_number: "AMZN-1234",
        expiry_date: "2026-12-31",
    },
    {
        id: 2,
        name: "Swiggy Voucher",
        description: "Office reward",
        amount: 300,
        remaining_amount: 300,
        card_number: "SWGY-5678",
        expiry_date: "2026-03-31",
    },
];

function formatExpiry(date) {
    return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

function Coupons() {
    const [coupons, setCoupons]=useState(INITIAL_COUPONS);
    const [isModalOpen, setIsModalOpen]=useState(false);
    const [editingCoupon, setEditingCoupon]=useState(null);

    const openAddModal=() => {
        setEditingCoupon(null);
        setIsModalOpen(true);
    };

    const openEditModal=(coupon) => {
        setEditingCoupon(coupon);
        setIsModalOpen(true);
    };

    const handleSave=(formData) => {
        const normalized = {
            ...formData,
            amount: Number(formData.amount),
            remaining_amount: Number(formData.remaining_amount),
        };

        if (editingCoupon) {
            setCoupons((prev) =>
                prev.map((coupon) =>
                    coupon.id === editingCoupon.id ? { ...coupon, ...normalized } : coupon
                )
            );
        } else {
            setCoupons((prev) => [
                ...prev,
                { ...normalized, id: Date.now() },
            ]);
        }

        setIsModalOpen(false);
        setEditingCoupon(null);
    };

    const handleDelete = (couponId) => {
        setCoupons((prev) => prev.filter((coupon) => coupon.id !== couponId));
    };

    return (
        <div className="coupons-page">
            <div className="coupons-top">
                <div>
                    <h2 className="coupons-subtitle">Manage your coupons and gift cards</h2>
                </div>
                <button className="coupons-add-btn" onClick={openAddModal}>
                    + Add Coupon
                </button>
            </div>

            <div className="coupons-list">
                {coupons.map((coupon) => {
                    const percent=coupon.amount
                        ? Math.round((coupon.remaining_amount / coupon.amount) * 100)
                        : 0;

                    return (
                        <div key={coupon.id} className="coupon-card">
                            <div className="coupon-card-top">
                                <div className="coupon-name">{coupon.name}</div>
                                <div className="coupon-subtitle">
                                    {coupon.description} · Expires {formatExpiry(coupon.expiry_date)}
                                </div>
                            </div>

                            {coupon.card_number && (
                                <div className="coupon-code">{coupon.card_number}</div>
                            )}

                            <div className="coupon-foot">
                                <div className="coupon-value">
                                    <strong>₹{coupon.remaining_amount.toLocaleString("en-IN")}</strong> of ₹{coupon.amount.toLocaleString("en-IN")}
                                </div>
                                <div className="coupon-actions-group">
                                    <button className="coupon-action-btn" onClick={() => openEditModal(coupon)}>
                                        Edit
                                    </button>
                                    <button className="coupon-action-btn delete" onClick={() => handleDelete(coupon.id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="coupon-progress-bar">
                                <div className="coupon-progress-fill" style={{ width: `${percent}%` }} />
                            </div>
                        </div>
                    );
                })}
            </div>

            <CouponModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingCoupon(null);
                }}
                onSave={handleSave}
                initialData={editingCoupon}
            />
        </div>
    );
}

export default Coupons;
