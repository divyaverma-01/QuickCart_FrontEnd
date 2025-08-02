"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AccountStatusPage() {
  const router = useRouter();
  const [statusData, setStatusData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStatusData();
  }, []);

  const fetchStatusData = async () => {
    try {
      const response = await fetch("/api/merchant/status");
      if (response.ok) {
        const data = await response.json();
        setStatusData(data);
      } else {
        setError("Failed to fetch status data");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Mock data for demonstration - replace with actual API call
  const mockStatusData = {
    merchantId: "MER123456789",
    businessName: "Tech Solutions Pvt Ltd",
    registrationDate: "2024-01-15",
    currentStep: "kyc_verification",
    overallStatus: "pending",
    kycStatus: "under_review",
    accountStatus: "pending_activation",

    // Step-wise progress
    steps: [
      {
        id: "registration",
        title: "Registration",
        status: "completed",
        completedAt: "2024-01-15T10:30:00Z",
        description: "Business registration completed successfully",
      },
      {
        id: "kyc_submission",
        title: "KYC Submission",
        status: "completed",
        completedAt: "2024-01-16T14:20:00Z",
        description: "All required documents submitted",
      },
      {
        id: "kyc_verification",
        title: "KYC Verification",
        status: "in_progress",
        startedAt: "2024-01-17T09:00:00Z",
        estimatedCompletion: "2024-01-20T17:00:00Z",
        description: "Documents under review by verification team",
      },
      {
        id: "account_activation",
        title: "Account Activation",
        status: "pending",
        description: "Account will be activated after KYC approval",
      },
    ],

    // Document status
    documents: [
      {
        name: "PAN Card",
        status: "approved",
        submittedAt: "2024-01-16T10:15:00Z",
        approvedAt: "2024-01-17T11:30:00Z",
      },
      {
        name: "GST Certificate",
        status: "under_review",
        submittedAt: "2024-01-16T10:20:00Z",
      },
      {
        name: "Address Proof",
        status: "approved",
        submittedAt: "2024-01-16T10:25:00Z",
        approvedAt: "2024-01-17T12:15:00Z",
      },
      {
        name: "Cancelled Cheque",
        status: "under_review",
        submittedAt: "2024-01-16T10:30:00Z",
      },
    ],

    // Error messages and next steps
    errors: [],
    nextSteps: [
      "Complete KYC verification process",
      "Provide additional documents if requested",
      "Wait for account activation approval",
    ],

    // Timeline
    timeline: [
      {
        date: "2024-01-15T10:30:00Z",
        event: "Registration Completed",
        description: "Business registration form submitted successfully",
      },
      {
        date: "2024-01-16T14:20:00Z",
        event: "KYC Documents Submitted",
        description: "All required documents uploaded for verification",
      },
      {
        date: "2024-01-17T09:00:00Z",
        event: "Verification Started",
        description: "KYC verification process initiated",
      },
      {
        date: "2024-01-17T11:30:00Z",
        event: "PAN Card Approved",
        description: "PAN card verification completed successfully",
      },
      {
        date: "2024-01-17T12:15:00Z",
        event: "Address Proof Approved",
        description: "Address proof verification completed successfully",
      },
    ],
  };

  // Use mock data for now
  const data = statusData || mockStatusData;

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
      case "approved":
        return "text-green-600 bg-green-50 border-green-200";
      case "in_progress":
      case "under_review":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "pending":
        return "text-gray-600 bg-gray-50 border-gray-200";
      case "rejected":
      case "failed":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
      case "approved":
        return "✓";
      case "in_progress":
      case "under_review":
        return "⟳";
      case "pending":
        return "⏳";
      case "rejected":
      case "failed":
        return "✗";
      default:
        return "○";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Loading status...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Error Loading Status
              </h2>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={fetchStatusData}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Account Status
              </h1>
              <p className="text-gray-600">
                Track your merchant account verification progress
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Merchant ID</p>
              <p className="font-mono text-lg font-semibold text-gray-800">
                {data.merchantId}
              </p>
            </div>
          </div>

          {/* Overall Status */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                  {data.businessName}
                </h2>
                <p className="text-gray-600">
                  Registration Date: {formatDate(data.registrationDate)}
                </p>
              </div>
              <div className="text-right">
                <div
                  className={`inline-flex items-center px-4 py-2 rounded-full border ${getStatusColor(
                    data.overallStatus
                  )}`}
                >
                  <span className="mr-2">
                    {getStatusIcon(data.overallStatus)}
                  </span>
                  <span className="font-medium capitalize">
                    {data.overallStatus.replace("_", " ")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Onboarding Progress
          </h2>

          <div className="space-y-4">
            {data.steps.map((step, index) => (
              <div key={step.id} className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                      step.status === "completed"
                        ? "bg-green-500 border-green-500 text-white"
                        : step.status === "in_progress"
                        ? "bg-yellow-500 border-yellow-500 text-white"
                        : "bg-gray-200 border-gray-300 text-gray-500"
                    }`}
                  >
                    {step.status === "completed" ? "✓" : index + 1}
                  </div>
                  {index < data.steps.length - 1 && (
                    <div
                      className={`w-0.5 h-8 mx-auto mt-2 ${
                        step.status === "completed"
                          ? "bg-green-500"
                          : "bg-gray-200"
                      }`}
                    ></div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-800">{step.title}</h3>
                    <div
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm border ${getStatusColor(
                        step.status
                      )}`}
                    >
                      <span className="mr-1">{getStatusIcon(step.status)}</span>
                      <span className="capitalize">
                        {step.status.replace("_", " ")}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-2">
                    {step.description}
                  </p>

                  {step.completedAt && (
                    <p className="text-xs text-gray-500">
                      Completed: {formatDate(step.completedAt)}
                    </p>
                  )}

                  {step.startedAt && step.status === "in_progress" && (
                    <p className="text-xs text-gray-500">
                      Started: {formatDate(step.startedAt)}
                      {step.estimatedCompletion && (
                        <span className="ml-2">
                          • Estimated completion:{" "}
                          {formatDate(step.estimatedCompletion)}
                        </span>
                      )}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Document Status */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Document Status
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.documents.map((doc) => (
              <div key={doc.name} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-800">{doc.name}</h3>
                  <div
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs border ${getStatusColor(
                      doc.status
                    )}`}
                  >
                    <span className="mr-1">{getStatusIcon(doc.status)}</span>
                    <span className="capitalize">
                      {doc.status.replace("_", " ")}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-500">
                  Submitted: {formatDate(doc.submittedAt)}
                </p>

                {doc.approvedAt && (
                  <p className="text-xs text-green-600">
                    Approved: {formatDate(doc.approvedAt)}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        {data.nextSteps.length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Next Steps
            </h2>

            <div className="space-y-3">
              {data.nextSteps.map((step, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-blue-600 text-sm font-medium">
                      {index + 1}
                    </span>
                  </div>
                  <p className="text-gray-700">{step}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timeline */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Timeline</h2>

          <div className="space-y-4">
            {data.timeline.map((event, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 w-3 h-3 bg-blue-500 rounded-full mr-4 mt-2"></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-800">{event.event}</h3>
                    <span className="text-sm text-gray-500">
                      {formatDate(event.date)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/merchant/account/kyc")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Update KYC Documents
            </button>

            <button
              onClick={() => router.push("/merchant/dashboard")}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
            >
              Go to Dashboard
            </button>

            <button
              onClick={fetchStatusData}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Refresh Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
