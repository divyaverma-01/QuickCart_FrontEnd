"use client";
import React from "react";

const ProgressSteps = ({ steps, activeStep }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-center">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                step.completed || activeStep >= step.id
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "bg-white border-gray-300 text-gray-500"
              }`}
            >
              {step.completed ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <span className="text-sm font-medium">{step.id}</span>
              )}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-16 h-0.5 mx-4 ${
                  step.completed ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {steps.map((step) => (
          <span
            key={step.id}
            className={`text-sm mx-4 ${
              activeStep >= step.id
                ? "text-blue-600 font-medium"
                : "text-gray-500"
            }`}
          >
            {step.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProgressSteps;
