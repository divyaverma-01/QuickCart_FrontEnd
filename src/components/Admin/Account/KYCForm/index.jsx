"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function KYCPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    // Bank Account Details
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    accountHolderName: "",

    // Business Documents
    panCard: null,
    gstCertificate: null,
    businessLicense: null,
    addressProof: null,

    // Additional Documents
    bankStatement: null,
    cancelledCheque: null,

    // Business Verification
    businessAddress: "",
    businessCity: "",
    businessState: "",
    businessPincode: "",

    // Contact Verification
    alternatePhone: "",
    alternateEmail: "",

    // Declaration
    declaration: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleFileChange = (field, file) => {
    if (file) {
      // Validate file type
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "application/pdf",
      ];
      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          [field]: "Please upload only JPG, PNG, or PDF files",
        }));
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          [field]: "File size should be less than 5MB",
        }));
        return;
      }

      setFormData((prev) => ({ ...prev, [field]: file }));
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Bank Account Validation
    if (!formData.bankName.trim()) {
      newErrors.bankName = "Bank name is required";
    }
    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = "Account number is required";
    } else if (!/^\d{9,18}$/.test(formData.accountNumber)) {
      newErrors.accountNumber = "Please enter a valid account number";
    }
    if (!formData.ifscCode.trim()) {
      newErrors.ifscCode = "IFSC code is required";
    } else if (
      !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode.toUpperCase())
    ) {
      newErrors.ifscCode = "Please enter a valid IFSC code";
    }
    if (!formData.accountHolderName.trim()) {
      newErrors.accountHolderName = "Account holder name is required";
    }

    // Required Documents Validation
    if (!formData.panCard) {
      newErrors.panCard = "PAN card is required";
    }
    if (!formData.gstCertificate) {
      newErrors.gstCertificate = "GST certificate is required";
    }
    if (!formData.addressProof) {
      newErrors.addressProof = "Address proof is required";
    }
    if (!formData.cancelledCheque) {
      newErrors.cancelledCheque = "Cancelled cheque is required";
    }

    // Business Address Validation
    if (!formData.businessAddress.trim()) {
      newErrors.businessAddress = "Business address is required";
    }
    if (!formData.businessCity.trim()) {
      newErrors.businessCity = "Business city is required";
    }
    if (!formData.businessState.trim()) {
      newErrors.businessState = "Business state is required";
    }
    if (!formData.businessPincode.trim()) {
      newErrors.businessPincode = "Business pincode is required";
    } else if (!/^[1-9][0-9]{5}$/.test(formData.businessPincode)) {
      newErrors.businessPincode = "Please enter a valid 6-digit pincode";
    }

    // Declaration Validation
    if (!formData.declaration) {
      newErrors.declaration = "You must accept the declaration";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const uploadFile = async (file, field) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("field", field);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        return data.fileUrl;
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      throw new Error(`Failed to upload ${field}: ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload all files first
      const uploadPromises = [];
      const fileFields = [
        "panCard",
        "gstCertificate",
        "businessLicense",
        "addressProof",
        "bankStatement",
        "cancelledCheque",
      ];

      fileFields.forEach((field) => {
        if (formData[field]) {
          uploadPromises.push(uploadFile(formData[field], field));
        }
      });

      const uploadedUrls = await Promise.all(uploadPromises);

      // Create submission data
      const submissionData = {
        ...formData,
        // Replace file objects with URLs
        panCard: uploadedUrls[0] || null,
        gstCertificate: uploadedUrls[1] || null,
        businessLicense: uploadedUrls[2] || null,
        addressProof: uploadedUrls[3] || null,
        bankStatement: uploadedUrls[4] || null,
        cancelledCheque: uploadedUrls[5] || null,
      };

      // Submit KYC data
      const response = await fetch("/api/merchant/kyc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        // Redirect to status page
        router.push("/merchant/account/status");
      } else {
        const errorData = await response.json();
        setErrors({
          submit:
            errorData.message || "KYC submission failed. Please try again.",
        });
      }
    } catch (error) {
      setErrors({
        submit: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              KYC Verification
            </h1>
            <p className="text-gray-600">
              Complete your Know Your Customer verification to activate your
              merchant account
            </p>
          </div>

          {errors.submit && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{errors.submit}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Bank Account Details Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                Bank Account Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bank Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.bankName}
                    onChange={(e) => handleChange("bankName", e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.bankName ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Enter bank name"
                  />
                  {errors.bankName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.bankName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.accountNumber}
                    onChange={(e) =>
                      handleChange("accountNumber", e.target.value)
                    }
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.accountNumber
                        ? "border-red-300"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter account number"
                  />
                  {errors.accountNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.accountNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    IFSC Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.ifscCode}
                    onChange={(e) =>
                      handleChange("ifscCode", e.target.value.toUpperCase())
                    }
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.ifscCode ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Enter IFSC code"
                    maxLength={11}
                  />
                  {errors.ifscCode && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.ifscCode}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Holder Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.accountHolderName}
                    onChange={(e) =>
                      handleChange("accountHolderName", e.target.value)
                    }
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.accountHolderName
                        ? "border-red-300"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter account holder name"
                  />
                  {errors.accountHolderName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.accountHolderName}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Required Documents Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                Required Documents
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PAN Card <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    onChange={(e) =>
                      handleFileChange("panCard", e.target.files[0])
                    }
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.panCard ? "border-red-300" : "border-gray-300"
                    }`}
                    accept=".jpg,.jpeg,.png,.pdf"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Upload PAN card (JPG, PNG, PDF - Max 5MB)
                  </p>
                  {errors.panCard && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.panCard}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GST Certificate <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    onChange={(e) =>
                      handleFileChange("gstCertificate", e.target.files[0])
                    }
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.gstCertificate
                        ? "border-red-300"
                        : "border-gray-300"
                    }`}
                    accept=".jpg,.jpeg,.png,.pdf"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Upload GST certificate (JPG, PNG, PDF - Max 5MB)
                  </p>
                  {errors.gstCertificate && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.gstCertificate}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business License (Optional)
                  </label>
                  <input
                    type="file"
                    onChange={(e) =>
                      handleFileChange("businessLicense", e.target.files[0])
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    accept=".jpg,.jpeg,.png,.pdf"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Upload business license (JPG, PNG, PDF - Max 5MB)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address Proof <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    onChange={(e) =>
                      handleFileChange("addressProof", e.target.files[0])
                    }
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.addressProof ? "border-red-300" : "border-gray-300"
                    }`}
                    accept=".jpg,.jpeg,.png,.pdf"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Upload address proof (JPG, PNG, PDF - Max 5MB)
                  </p>
                  {errors.addressProof && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.addressProof}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bank Statement (Optional)
                  </label>
                  <input
                    type="file"
                    onChange={(e) =>
                      handleFileChange("bankStatement", e.target.files[0])
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    accept=".jpg,.jpeg,.png,.pdf"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Upload bank statement (JPG, PNG, PDF - Max 5MB)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cancelled Cheque <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    onChange={(e) =>
                      handleFileChange("cancelledCheque", e.target.files[0])
                    }
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.cancelledCheque
                        ? "border-red-300"
                        : "border-gray-300"
                    }`}
                    accept=".jpg,.jpeg,.png,.pdf"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Upload cancelled cheque (JPG, PNG, PDF - Max 5MB)
                  </p>
                  {errors.cancelledCheque && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.cancelledCheque}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Business Address Verification Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                Business Address Verification
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.businessAddress}
                    onChange={(e) =>
                      handleChange("businessAddress", e.target.value)
                    }
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.businessAddress
                        ? "border-red-300"
                        : "border-gray-300"
                    }`}
                    rows={3}
                    placeholder="Enter your complete business address"
                  />
                  {errors.businessAddress && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.businessAddress}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.businessCity}
                      onChange={(e) =>
                        handleChange("businessCity", e.target.value)
                      }
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.businessCity
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter city"
                    />
                    {errors.businessCity && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.businessCity}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.businessState}
                      onChange={(e) =>
                        handleChange("businessState", e.target.value)
                      }
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.businessState
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter state"
                    />
                    {errors.businessState && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.businessState}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pincode <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.businessPincode}
                      onChange={(e) =>
                        handleChange("businessPincode", e.target.value)
                      }
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.businessPincode
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter pincode"
                      maxLength={6}
                    />
                    {errors.businessPincode && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.businessPincode}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Verification Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                Contact Verification
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alternate Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.alternatePhone}
                    onChange={(e) =>
                      handleChange("alternatePhone", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter alternate phone number"
                    maxLength={10}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alternate Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.alternateEmail}
                    onChange={(e) =>
                      handleChange("alternateEmail", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter alternate email address"
                  />
                </div>
              </div>
            </div>

            {/* Declaration Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                Declaration
              </h2>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="declaration"
                    checked={formData.declaration}
                    onChange={(e) =>
                      handleChange("declaration", e.target.checked)
                    }
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="declaration"
                    className="ml-3 text-sm text-gray-700"
                  >
                    I hereby declare that all the information provided above is
                    true, correct, and complete to the best of my knowledge. I
                    understand that any false or misleading information may
                    result in the rejection of my application or termination of
                    my merchant account. I authorize QuickCart to verify the
                    information provided and conduct necessary background
                    checks.
                    <span className="text-red-500">*</span>
                  </label>
                </div>
                {errors.declaration && (
                  <p className="text-red-500 text-sm mt-2 ml-7">
                    {errors.declaration}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6 border-t">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? "Submitting KYC..." : "Submit KYC Application"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// "use client";
// import { useState } from "react";
// import { createClient } from "@supabase/supabase-js";

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// );

// export default function KycUpload({ user }) {
//   const [file, setFile] = useState(null);
//   const [type, setType] = useState("pan");
//   const [uploading, setUploading] = useState(false);

//   const handleUpload = async () => {
//     if (!file || !user) return alert("Missing file or user");

//     setUploading(true);

//     const filename = `${user.id}/${Date.now()}_${file.name}`;
//     const { data, error } = await supabase.storage
//       .from("kyc-docs")
//       .upload(filename, file);

//     if (error) {
//       alert("Upload error: " + error.message);
//       return setUploading(false);
//     }

//     const fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/kyc-docs/${filename}`;

//     const { error: insertError } = await supabase.from("kyc_uploads").insert([
//       {
//         user_id: user.id,
//         document_type: type,
//         file_url: fileUrl,
//         status: "pending",
//       },
//     ]);

//     setUploading(false);
//     if (insertError) {
//       alert("DB error: " + insertError.message);
//     } else {
//       alert("KYC document uploaded successfully!");
//     }
//   };

//   return (
//     <div className="flex flex-col gap-4 p-4 max-w-md mx-auto">
//       <label className="text-lg font-medium">Select Document Type:</label>
//       <select
//         value={type}
//         onChange={(e) => setType(e.target.value)}
//         className="border p-2 rounded"
//       >
//         <option value="pan">PAN Card</option>
//         <option value="aadhaar">Aadhaar Card</option>
//         <option value="passport">Passport</option>
//       </select>

//       <input
//         type="file"
//         accept="image/*,application/pdf"
//         onChange={(e) => setFile(e.target.files[0])}
//         className="border p-2 rounded"
//       />

//       <button
//         onClick={handleUpload}
//         disabled={uploading}
//         className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//       >
//         {uploading ? "Uploading..." : "Upload KYC"}
//       </button>
//     </div>
//   );
// }
