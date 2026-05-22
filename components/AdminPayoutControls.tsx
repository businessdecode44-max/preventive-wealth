"use client";

import { useState } from "react";

type AdminPayoutControlsProps = {
  orderId: string;
  initialStatus: string;
};

export function AdminPayoutControls({ orderId, initialStatus }: AdminPayoutControlsProps) {
  const [status, setStatus] = useState(initialStatus);
  const [isSaving, setIsSaving] = useState(false);

  async function updateStatus(nextStatus: string) {
    setIsSaving(true);

    try {
      const response = await fetch(`/api/admin/affiliate-orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ payoutStatus: nextStatus })
      });

      if (!response.ok) {
        throw new Error("Could not update payout status.");
      }

      setStatus(nextStatus);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="payout-controls">
      <span>{status}</span>
      <button type="button" onClick={() => updateStatus("pending")} disabled={isSaving || status === "pending"}>
        Mark Pending
      </button>
      <button type="button" onClick={() => updateStatus("paid")} disabled={isSaving || status === "paid"}>
        Mark Paid
      </button>
    </div>
  );
}
