import React, { useState, useEffect } from "react";

import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Save,
  X,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Award,
  Heart,
} from "lucide-react";
import Button from "@/app/ui/Button";
import Card from "@/app/ui/Card";
import Badge from "@/app/ui/Badge";

interface CVData {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  dob: string; // LocalDate as string in format YYYY-MM-DD
  skill: string;
  exp: string;
  education: string;
  typeOfDisability: string;
  typeOfJob: string;
  createdAt: string;
  updatedAt: string;
}

const CVBuilder: React.FC = () => {
  const [cvList, setCvList] = useState<CVData[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [viewingId, setViewingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<
    Omit<CVData, "id" | "createdAt" | "updatedAt">
  >({
    name: "",
    phone: "",
    email: "",
    address: "",
    dob: "",
    skill: "",
    exp: "",
    education: "",
    typeOfDisability: "",
    typeOfJob: "",
  });

  // Load CVs from localStorage on component mount
  useEffect(() => {
    const savedCVs = localStorage.getItem("userCVs");
    if (savedCVs) {
      try {
        setCvList(JSON.parse(savedCVs));
      } catch (error) {
        console.error("Error loading CVs:", error);
      }
    }
  }, []);

  // Save CVs to localStorage whenever cvList changes
  useEffect(() => {
    localStorage.setItem("userCVs", JSON.stringify(cvList));
  }, [cvList]);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      address: "",
      dob: "",
      skill: "",
      exp: "",
      education: "",
      typeOfDisability: "",
      typeOfJob: "",
    });
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    setViewingId(null);
    resetForm();
  };

  const handleEdit = (cv: CVData) => {
    setEditingId(cv.id);
    setIsCreating(false);
    setViewingId(null);
    setFormData({
      name: cv.name,
      phone: cv.phone,
      email: cv.email,
      address: cv.address,
      dob: cv.dob,
      skill: cv.skill,
      exp: cv.exp,
      education: cv.education,
      typeOfDisability: cv.typeOfDisability,
      typeOfJob: cv.typeOfJob,
    });
  };

  const handleView = (cv: CVData) => {
    setViewingId(cv.id);
    setIsCreating(false);
    setEditingId(null);
  };

  const handleSave = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill in required fields: Name, Email, and Phone");
      return;
    }

    const now = new Date().toISOString();

    if (editingId) {
      // Update existing CV
      setCvList((prev) =>
        prev.map((cv) =>
          cv.id === editingId
            ? {
                ...formData,
                id: editingId,
                createdAt: cv.createdAt,
                updatedAt: now,
              }
            : cv
        )
      );
      setEditingId(null);
    } else {
      // Create new CV
      const newCV: CVData = {
        ...formData,
        id: Date.now().toString(),
        createdAt: now,
        updatedAt: now,
      };
      setCvList((prev) => [...prev, newCV]);
      setIsCreating(false);
    }

    resetForm();
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this CV?")) {
      setCvList((prev) => prev.filter((cv) => cv.id !== id));
    }
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    setViewingId(null);
    resetForm();
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("vi-VN");
  };

  const viewingCV = viewingId ? cvList.find((cv) => cv.id === viewingId) : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-full mx-auto  py-8">
        {/* Header */}
        <div className="mb-6">
          {/* <Link
            href="/"
            className="inline-flex items-center text-green-600 hover:text-green-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link> */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                CV Management
              </h1>
              <p className="text-gray-600">Create, edit, and manage your CVs</p>
            </div>
            {!isCreating && !editingId && !viewingId && (
              <Button onClick={handleCreate} icon={Plus}>
                Create New CV
              </Button>
            )}
          </div>
        </div>

        {/* CV Form (Create/Edit) */}
        {(isCreating || editingId) && (
          <Card className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingId ? "Edit CV" : "Create New CV"}
              </h2>
              <div className="flex space-x-2">
                <Button onClick={handleSave} icon={Save}>
                  Save CV
                </Button>
                <Button onClick={handleCancel} variant="outline" icon={X}>
                  Cancel
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="+84 123 456 789"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Your address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => handleInputChange("dob", e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type of Job
                </label>
                <select
                  value={formData.typeOfJob}
                  onChange={(e) =>
                    handleInputChange("typeOfJob", e.target.value)
                  }
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Select job type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Internship">Internship</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skills
                </label>
                <textarea
                  rows={3}
                  value={formData.skill}
                  onChange={(e) => handleInputChange("skill", e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="List your skills (e.g., JavaScript, React, Node.js, Communication, Leadership)"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Work Experience
                </label>
                <textarea
                  rows={4}
                  value={formData.exp}
                  onChange={(e) => handleInputChange("exp", e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Describe your work experience, positions held, and achievements"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Education
                </label>
                <textarea
                  rows={3}
                  value={formData.education}
                  onChange={(e) =>
                    handleInputChange("education", e.target.value)
                  }
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="List your educational background, degrees, certifications"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type of Disability (Optional)
                </label>
                <input
                  type="text"
                  value={formData.typeOfDisability}
                  onChange={(e) =>
                    handleInputChange("typeOfDisability", e.target.value)
                  }
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="If applicable, specify any disability for accommodation purposes"
                />
              </div>
            </div>
          </Card>
        )}

        {/* CV Detail View */}
        {viewingCV && (
          <Card className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                CV Details
              </h2>
              <div className="flex space-x-2">
                <Button
                  onClick={() => handleEdit(viewingCV)}
                  variant="outline"
                  icon={Edit}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => setViewingId(null)}
                  variant="outline"
                  icon={X}
                >
                  Close
                </Button>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-8">
              {/* Header */}
              <div className="text-center mb-8 pb-6 border-b border-gray-200">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {viewingCV.name}
                </h1>
                <div className="flex flex-wrap justify-center gap-4 text-gray-600">
                  {viewingCV.phone && (
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      {viewingCV.phone}
                    </div>
                  )}
                  {viewingCV.email && (
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      {viewingCV.email}
                    </div>
                  )}
                  {viewingCV.address && (
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {viewingCV.address}
                    </div>
                  )}
                  {viewingCV.dob && (
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {formatDate(viewingCV.dob)}
                    </div>
                  )}
                </div>
              </div>

              {/* Job Type */}
              {viewingCV.typeOfJob && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                    <Briefcase className="w-5 h-5 mr-2" />
                    Seeking Position
                  </h3>
                  <Badge variant="info">{viewingCV.typeOfJob}</Badge>
                </div>
              )}

              {/* Skills */}
              {viewingCV.skill && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    Skills
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {viewingCV.skill}
                  </p>
                </div>
              )}

              {/* Experience */}
              {viewingCV.exp && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Briefcase className="w-5 h-5 mr-2" />
                    Work Experience
                  </h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {viewingCV.exp}
                  </p>
                </div>
              )}

              {/* Education */}
              {viewingCV.education && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <GraduationCap className="w-5 h-5 mr-2" />
                    Education
                  </h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {viewingCV.education}
                  </p>
                </div>
              )}

              {/* Disability Information */}
              {viewingCV.typeOfDisability && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Heart className="w-5 h-5 mr-2" />
                    Accessibility Information
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {viewingCV.typeOfDisability}
                  </p>
                </div>
              )}

              {/* Timestamps */}
              <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-500">
                <div className="flex justify-between">
                  <span>Created: {formatDateTime(viewingCV.createdAt)}</span>
                  <span>Updated: {formatDateTime(viewingCV.updatedAt)}</span>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* CV List */}
        {!isCreating && !editingId && !viewingId && (
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Your CVs ({cvList.length})
              </h2>
            </div>

            {cvList.length === 0 ? (
              <div className="text-center py-12">
                <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No CVs created yet
                </h3>
                <p className="text-gray-500 mb-4">
                  Create your first CV to start applying for jobs and
                  opportunities.
                </p>
                <Button onClick={handleCreate} icon={Plus}>
                  Create Your First CV
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cvList.map((cv) => (
                  <Card
                    key={cv.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <div className="space-y-4">
                      {/* CV Header */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {cv.name}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <Mail className="w-4 h-4 mr-1" />
                          {cv.email}
                        </div>
                        {cv.typeOfJob && (
                          <Badge variant="info" size="sm">
                            {cv.typeOfJob}
                          </Badge>
                        )}
                      </div>

                      {/* CV Preview */}
                      <div className="space-y-2 text-sm text-gray-600">
                        {cv.phone && (
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 mr-2" />
                            {cv.phone}
                          </div>
                        )}
                        {cv.address && (
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            {cv.address}
                          </div>
                        )}
                        {cv.skill && (
                          <div className="flex items-start">
                            <Award className="w-4 h-4 mr-2 mt-0.5" />
                            <span className="line-clamp-2">{cv.skill}</span>
                          </div>
                        )}
                      </div>

                      {/* Timestamps */}
                      <div className="text-xs text-gray-400 border-t pt-3">
                        <div>Created: {formatDateTime(cv.createdAt)}</div>
                        <div>Updated: {formatDateTime(cv.updatedAt)}</div>
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-2 pt-2">
                        <Button
                          onClick={() => handleView(cv)}
                          variant="primary"
                          size="sm"
                          icon={Eye}
                          className="flex-1"
                        >
                          View
                        </Button>
                        <Button
                          onClick={() => handleEdit(cv)}
                          variant="outline"
                          size="sm"
                          icon={Edit}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDelete(cv.id)}
                          variant="danger"
                          size="sm"
                          icon={Trash2}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  );
};

export default CVBuilder;
