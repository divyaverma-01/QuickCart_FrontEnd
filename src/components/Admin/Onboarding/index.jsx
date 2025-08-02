"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingDashboardPage() {
  const router = useRouter();
  const [onboardingData, setOnboardingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    fetchOnboardingData();
  }, []);

  const fetchOnboardingData = async () => {
    try {
      const response = await fetch("/api/merchant/onboarding");
      if (response.ok) {
        const data = await response.json();
        setOnboardingData(data);
        // Find current step
        const activeStep = data.steps.findIndex(
          (step) => step.status === "active" || step.status === "pending"
        );
        setCurrentStep(activeStep >= 0 ? activeStep : 0);
      } else {
        // Use mock data if API fails
        setOnboardingData(mockOnboardingData);
      }
    } catch (error) {
      // Use mock data on error
      setOnboardingData(mockOnboardingData);
    } finally {
      setLoading(false);
    }
  };

  // Mock data for demonstration
  const mockOnboardingData = {
    merchantId: "MER123456789",
    businessName: "Tech Solutions Pvt Ltd",
    progress: 60, // percentage
    estimatedTime: "2-3 business days",

    steps: [
      {
        id: "registration",
        title: "Business Registration",
        description: "Complete your business registration form",
        status: "completed",
        completedAt: "2024-01-15T10:30:00Z",
        icon: "📝",
        url: "/merchant/account/register",
      },
      {
        id: "kyc_submission",
        title: "KYC Document Submission",
        description: "Upload required verification documents",
        status: "completed",
        completedAt: "2024-01-16T14:20:00Z",
        icon: "📋",
        url: "/merchant/account/kyc",
      },
      {
        id: "kyc_verification",
        title: "KYC Verification",
        description: "Documents under review by verification team",
        status: "in_progress",
        startedAt: "2024-01-17T09:00:00Z",
        estimatedCompletion: "2024-01-20T17:00:00Z",
        icon: "🔍",
        url: "/merchant/account/status",
      },
      {
        id: "account_activation",
        title: "Account Activation",
        description: "Your merchant account will be activated",
        status: "pending",
        icon: "✅",
        url: "/merchant/dashboard",
      },
    ],

    checklist: [
      {
        id: "business_info",
        title: "Business Information",
        items: [
          { name: "Business Name", status: "completed" },
          { name: "Business Type", status: "completed" },
          { name: "GST Number", status: "completed" },
          { name: "PAN Number", status: "completed" },
          { name: "Business Address", status: "completed" },
        ],
      },
      {
        id: "contact_info",
        title: "Contact Information",
        items: [
          { name: "Primary Contact", status: "completed" },
          { name: "Email Address", status: "completed" },
          { name: "Phone Number", status: "completed" },
          { name: "Alternate Contact", status: "pending" },
        ],
      },
      {
        id: "documents",
        title: "Required Documents",
        items: [
          { name: "PAN Card", status: "approved" },
          { name: "GST Certificate", status: "under_review" },
          { name: "Address Proof", status: "approved" },
          { name: "Cancelled Cheque", status: "under_review" },
          { name: "Business License", status: "not_required" },
        ],
      },
      {
        id: "bank_details",
        title: "Bank Account Details",
        items: [
          { name: "Bank Name", status: "completed" },
          { name: "Account Number", status: "completed" },
          { name: "IFSC Code", status: "completed" },
          { name: "Account Holder Name", status: "completed" },
        ],
      },
    ],

    recentUpdates: [
      {
        id: 1,
        type: "success",
        message: "PAN Card verification completed successfully",
        timestamp: "2024-01-17T11:30:00Z",
      },
      {
        id: 2,
        type: "success",
        message: "Address proof verification completed successfully",
        timestamp: "2024-01-17T12:15:00Z",
      },
      {
        id: 3,
        type: "info",
        message: "GST Certificate verification in progress",
        timestamp: "2024-01-17T13:00:00Z",
      },
      {
        id: 4,
        type: "warning",
        message: "Cancelled cheque verification pending",
        timestamp: "2024-01-17T14:00:00Z",
      },
    ],

    supportInfo: {
      email: "merchant-support@quickcart.com",
      phone: "+91-1800-123-4567",
      hours: "Monday to Friday, 9:00 AM - 6:00 PM IST",
    },
  };

  const data = onboardingData || mockOnboardingData;

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
      case "not_required":
        return "text-gray-400 bg-gray-50 border-gray-200";
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
      case "not_required":
        return "—";
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

  const handleStepClick = (step) => {
    if (step.url) {
      router.push(step.url);
    }
  };

  const getUpdateIcon = (type) => {
    switch (type) {
      case "success":
        return "✅";
      case "warning":
        return "⚠️";
      case "error":
        return "❌";
      case "info":
        return "ℹ️";
      default:
        return "📢";
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">
                Loading onboarding data...
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Merchant Onboarding
              </h1>
              <p className="text-gray-600">
                Complete your onboarding process to start selling on QuickCart
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Merchant ID</p>
              <p className="font-mono text-lg font-semibold text-gray-800">
                {data.merchantId}
              </p>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                  {data.businessName}
                </h2>
                <p className="text-gray-600">
                  Estimated completion time: {data.estimatedTime}
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600">
                  {data.progress}%
                </div>
                <div className="text-sm text-gray-500">Complete</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${data.progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Steps */}
          <div className="lg:col-span-2 space-y-6">
            {/* Onboarding Steps */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Onboarding Steps
              </h2>

              <div className="space-y-4">
                {data.steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`border rounded-lg p-6 cursor-pointer transition-all hover:shadow-md ${
                      step.status === "completed"
                        ? "border-green-200 bg-green-50"
                        : step.status === "in_progress"
                        ? "border-yellow-200 bg-yellow-50"
                        : "border-gray-200 bg-white"
                    }`}
                    onClick={() => handleStepClick(step)}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-4">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                            step.status === "completed"
                              ? "bg-green-500 text-white"
                              : step.status === "in_progress"
                              ? "bg-yellow-500 text-white"
                              : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          {step.icon}
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-800">
                            {step.title}
                          </h3>
                          <div
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm border ${getStatusColor(
                              step.status
                            )}`}
                          >
                            <span className="mr-1">
                              {getStatusIcon(step.status)}
                            </span>
                            <span className="capitalize">
                              {step.status.replace("_", " ")}
                            </span>
                          </div>
                        </div>

                        <p className="text-gray-600 mb-3">{step.description}</p>

                        {step.completedAt && (
                          <p className="text-xs text-green-600">
                            Completed: {formatDate(step.completedAt)}
                          </p>
                        )}

                        {step.startedAt && step.status === "in_progress" && (
                          <p className="text-xs text-yellow-600">
                            Started: {formatDate(step.startedAt)}
                            {step.estimatedCompletion && (
                              <span className="ml-2">
                                • Estimated:{" "}
                                {formatDate(step.estimatedCompletion)}
                              </span>
                            )}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Checklist */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Requirements Checklist
              </h2>

              <div className="space-y-6">
                {data.checklist.map((section) => (
                  <div key={section.id} className="border rounded-lg p-4">
                    <h3 className="font-medium text-gray-800 mb-3">
                      {section.title}
                    </h3>

                    <div className="space-y-2">
                      {section.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <span className="text-gray-700">{item.name}</span>
                          <div
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs border ${getStatusColor(
                              item.status
                            )}`}
                          >
                            <span className="mr-1">
                              {getStatusIcon(item.status)}
                            </span>
                            <span className="capitalize">
                              {item.status.replace("_", " ")}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Updates */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Recent Updates
              </h3>

              <div className="space-y-3">
                {data.recentUpdates.map((update) => (
                  <div key={update.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 text-lg">
                      {getUpdateIcon(update.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-700">{update.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(update.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Information */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Need Help?
              </h3>

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Email Support
                  </p>
                  <p className="text-sm text-blue-600">
                    {data.supportInfo.email}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Phone Support
                  </p>
                  <p className="text-sm text-blue-600">
                    {data.supportInfo.phone}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Support Hours
                  </p>
                  <p className="text-sm text-gray-600">
                    {data.supportInfo.hours}
                  </p>
                </div>
              </div>

              <button className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                Contact Support
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Quick Actions
              </h3>

              <div className="space-y-3">
                <button
                  onClick={() => router.push("/merchant/account/status")}
                  className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  Check Status
                </button>

                <button
                  onClick={() => router.push("/merchant/account/kyc")}
                  className="w-full bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                >
                  Update Documents
                </button>

                <button
                  onClick={() => router.push("/merchant/dashboard")}
                  className="w-full bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
                >
                  Go to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="mb-4 sm:mb-0">
              <p className="text-gray-600">
                Current Step:{" "}
                <span className="font-medium text-gray-800">
                  {data.steps[currentStep]?.title}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                {data.steps[currentStep]?.description}
              </p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => router.push("/merchant/account/status")}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors"
              >
                View Status
              </button>

              {data.steps[currentStep]?.url && (
                <button
                  onClick={() => router.push(data.steps[currentStep].url)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Continue
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
