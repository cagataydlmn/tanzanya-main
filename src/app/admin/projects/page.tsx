"use client";

import { useState, useEffect } from 'react';
import { getProjects, createProject, deleteProject, updateProject } from '@/app/actions/projects';
import { getCategories, createCategory } from '@/app/actions/categories';
import { uploadImageAction, uploadMultipleImagesAction } from '@/app/actions/upload';
import Image from 'next/image';
import PageHeaderForm from '@/components/admin/PageHeaderForm';

interface ProjectItem {
  id: number;
  name: string;
  category: string;
  description?: string | null;
  img: string;
  images?: string[];
  metaTitle?: string | null;
  metaDesc?: string | null;
  metaKeys?: string | null;
  isFeatured: boolean;
  createdAt: Date;
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  // Form States
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [coverImg, setCoverImg] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDesc, setMetaDesc] = useState('');
  const [metaKeys, setMetaKeys] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const availableCategories = categories.map(cat => typeof cat === 'string' ? cat : cat.name);

  const fetchProjects = async () => {
    const res = await getProjects();
    if (res.success && res.data) {
      setProjects(res.data as ProjectItem[]);
    }
  };

  const fetchCategories = async () => {
    const res = await getCategories();
    if (res.success && res.data) {
      setCategories(res.data);
      if (res.data.length > 0 && !category && !isNewCategory) {
        setCategory(res.data[0].name);
      }
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchCategories();
  }, []);

  const handleAddNewClick = () => {
    setEditingId(null);
    setName('');
    setDescription('');
    setImages([]);
    setCoverImg('');
    setMetaTitle('');
    setMetaDesc('');
    setMetaKeys('');
    setIsFeatured(false);
    
    if (categories.length > 0) {
      setIsNewCategory(false);
      setCategory(categories[0].name);
    } else {
      setIsNewCategory(true);
    }
    
    setNewCategoryName('');
    setShowForm(true);
    setMessage(null);
  };

  const handleEditClick = (project: ProjectItem) => {
    setEditingId(project.id);
    setName(project.name);
    setCategory(project.category);
    setIsNewCategory(false);
    setNewCategoryName('');
    setDescription(project.description || '');
    
    const projectImages = Array.isArray(project.images) && project.images.length > 0
      ? project.images
      : (project.img ? [project.img] : []);
    
    setImages(projectImages);
    setCoverImg(project.img || projectImages[0] || '');
    setMetaTitle(project.metaTitle || '');
    setMetaDesc(project.metaDesc || '');
    setMetaKeys(project.metaKeys || '');
    setIsFeatured(project.isFeatured);
    setShowForm(true);
    setMessage(null);
  };

  const uploadFiles = async (fileList: FileList | File[]) => {
    const files = Array.from(fileList);
    if (files.length === 0) return;

    setUploading(true);
    setMessage(null);

    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));

    const res = await uploadMultipleImagesAction(formData);
    setUploading(false);

    if (res.success && res.urls && res.urls.length > 0) {
      setImages((prev) => {
        const next = [...prev, ...res.urls!];
        if (!coverImg && next.length > 0) {
          setCoverImg(next[0]);
        }
        return next;
      });
      setMessage({ type: 'success', text: `${res.urls.length} image(s) uploaded successfully.` });
    } else {
      setMessage({ type: 'error', text: res.error || 'Failed to upload images.' });
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    await uploadFiles(files);
    e.target.value = ''; // Reset input so same files can be re-selected if needed
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;
    await uploadFiles(files);
  };

  const handleSetCover = (url: string) => {
    setCoverImg(url);
    // Optional: move cover image to first position
    setImages((prev) => [url, ...prev.filter(u => u !== url)]);
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const urlToRemove = images[indexToRemove];
    const nextImages = images.filter((_, idx) => idx !== indexToRemove);
    setImages(nextImages);
    if (coverImg === urlToRemove) {
      setCoverImg(nextImages[0] || '');
    }
  };

  const handleMoveImage = (index: number, direction: 'left' | 'right') => {
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= images.length) return;
    const nextImages = [...images];
    const temp = nextImages[index];
    nextImages[index] = nextImages[targetIndex];
    nextImages[targetIndex] = temp;
    setImages(nextImages);
    // If we moved the first image, update coverImg accordingly if not explicitly fixed
    if (index === 0 || targetIndex === 0) {
      setCoverImg(nextImages[0]);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    
    setLoading(true);
    const res = await deleteProject(id);
    setLoading(false);

    if (res.success) {
      setMessage({ type: 'success', text: 'Project deleted successfully.' });
      fetchProjects();
    } else {
      setMessage({ type: 'error', text: res.error || 'Failed to delete project.' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setMessage({ type: 'error', text: 'Please enter a project name.' });
      return;
    }
    if (images.length === 0) {
      setMessage({ type: 'error', text: 'Please upload at least one image for the project.' });
      return;
    }

    setLoading(true);
    setMessage(null);

    let finalCategory = category;
    if (isNewCategory && newCategoryName.trim() !== '') {
      finalCategory = newCategoryName.trim();
      await createCategory(finalCategory); 
    }

    const finalCover = coverImg || images[0];

    const data = {
      name,
      category: finalCategory,
      description,
      img: finalCover,
      images,
      metaTitle,
      metaDesc,
      metaKeys,
      isFeatured
    };

    let res;
    if (editingId) {
      res = await updateProject(editingId, data);
    } else {
      res = await createProject(data);
    }

    setLoading(false);

    if (res.success) {
      setMessage({ type: 'success', text: editingId ? 'Project updated successfully.' : 'Project added successfully.' });
      setShowForm(false);
      setEditingId(null);
      fetchProjects();
      fetchCategories();
    } else {
      setMessage({ type: 'error', text: res.error || (editingId ? 'An error occurred while updating the project.' : 'An error occurred while adding the project.') });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeaderForm pageIdentifier="projects" />

      {/* Alert Message */}
      {message && (
        <div className={`p-4 border text-sm font-medium rounded ${
          message.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif text-stone-900 font-bold">Projects Management</h1>
          <p className="text-xs text-stone-500 mt-1">Add and manage projects with multiple photos for your site.</p>
        </div>
        <button 
          onClick={showForm ? () => setShowForm(false) : handleAddNewClick}
          className="px-6 py-2.5 bg-stone-900 text-white font-medium text-xs md:text-sm uppercase tracking-wider hover:bg-amber-800 transition-colors cursor-pointer rounded shrink-0"
        >
          {showForm ? 'Back to List' : '+ Add New Project'}
        </button>
      </div>

      {showForm ? (
        <div className="bg-white p-6 sm:p-8 border border-stone-200 shadow-sm rounded">
          <h2 className="text-xl font-bold text-stone-900 mb-6 border-b border-stone-100 pb-4">
            {editingId ? 'Edit Project' : 'Add New Project'}
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-900 uppercase tracking-wider block">Project Name *</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700 rounded" 
                  placeholder="e.g. Vadi Istanbul Residences" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-900 uppercase tracking-wider block">Category *</label>
                {isNewCategory ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700 rounded"
                      placeholder="New category name..."
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setIsNewCategory(false);
                        setNewCategoryName('');
                      }}
                      className="px-4 py-3 bg-stone-200 text-stone-700 font-bold uppercase tracking-wider text-xs hover:bg-stone-300 transition-colors rounded whitespace-nowrap"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <select 
                    value={category}
                    onChange={(e) => {
                      if (e.target.value === 'YENI_EKLE') {
                        setIsNewCategory(true);
                      } else {
                        setCategory(e.target.value);
                      }
                    }}
                    className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700 rounded"
                  >
                    {availableCategories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                    <option value="YENI_EKLE" className="font-bold text-amber-700">+ Add New Category...</option>
                  </select>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 p-4 bg-stone-50 border border-stone-200 rounded">
              <input
                type="checkbox"
                id="isFeatured"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 text-amber-800 border-stone-300 rounded focus:ring-amber-700"
              />
              <label htmlFor="isFeatured" className="text-sm font-bold text-stone-900 uppercase tracking-wider cursor-pointer">
                Is Featured Project? (Show on Homepage)
              </label>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-900 uppercase tracking-wider block flex items-center justify-between">
                  <span>Meta Title (SEO)</span>
                  <span className="text-[10px] text-stone-400 normal-case font-normal">Optional</span>
                </label>
                <input 
                  type="text" 
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700 rounded" 
                  placeholder="Enter subtitle or detailed title..." 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-900 uppercase tracking-wider block flex items-center justify-between">
                  <span>Keywords (SEO)</span>
                  <span className="text-[10px] text-stone-400 normal-case font-normal">Optional</span>
                </label>
                <input 
                  type="text" 
                  value={metaKeys}
                  onChange={(e) => setMetaKeys(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700 rounded" 
                  placeholder="e.g. wooden house, modern design" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-900 uppercase tracking-wider block flex items-center justify-between">
                <span>Meta Description (SEO)</span>
                <span className="text-[10px] text-stone-400 normal-case font-normal">Optional</span>
              </label>
              <textarea 
                value={metaDesc}
                onChange={(e) => setMetaDesc(e.target.value)}
                rows={2}
                className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700 rounded" 
                placeholder="Summary description for search engines..." 
              />
            </div>

            {/* Description Textarea */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-900 uppercase tracking-wider block">Project Description</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700 rounded" 
                placeholder="Enter project details, materials used, and features..." 
              />
            </div>

            {/* Multiple Images Upload & Management Section */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <label className="text-sm font-bold text-stone-900 uppercase tracking-wider block">
                  Project Images ({images.length}) *
                </label>
                <span className="text-xs text-stone-500">
                  You can upload multiple photos. The photo marked with ⭐ is the main cover.
                </span>
              </div>

              {/* Uploaded Images Gallery Grid */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 bg-stone-50 border border-stone-200 rounded">
                  {images.map((imgUrl, index) => {
                    const isCover = coverImg === imgUrl || (!coverImg && index === 0);

                    return (
                      <div 
                        key={`${imgUrl}-${index}`}
                        className={`relative group aspect-[4/3] rounded overflow-hidden border-2 transition-all ${
                          isCover ? 'border-amber-700 shadow-md ring-2 ring-amber-700/20' : 'border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        <Image 
                          src={imgUrl} 
                          alt={`Project Image ${index + 1}`} 
                          fill 
                          unoptimized
                          sizes="200px"
                          className="object-cover" 
                        />

                        {/* Cover Badge */}
                        {isCover && (
                          <div className="absolute top-2 left-2 bg-amber-700 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow z-10">
                            ⭐ Cover
                          </div>
                        )}

                        {/* Hover Overlay with Controls */}
                        <div className="absolute inset-0 bg-stone-950/75 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2 z-20">
                          {/* Top row: order controls & delete */}
                          <div className="flex justify-between items-center">
                            <div className="flex gap-1">
                              {index > 0 && (
                                <button
                                  type="button"
                                  onClick={() => handleMoveImage(index, 'left')}
                                  className="w-6 h-6 bg-white/20 hover:bg-white text-white hover:text-stone-900 rounded flex items-center justify-center text-xs font-bold transition-colors"
                                  title="Move Left"
                                >
                                  ←
                                </button>
                              )}
                              {index < images.length - 1 && (
                                <button
                                  type="button"
                                  onClick={() => handleMoveImage(index, 'right')}
                                  className="w-6 h-6 bg-white/20 hover:bg-white text-white hover:text-stone-900 rounded flex items-center justify-center text-xs font-bold transition-colors"
                                  title="Move Right"
                                >
                                  →
                                </button>
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={() => handleRemoveImage(index)}
                              className="w-6 h-6 bg-red-600 hover:bg-red-700 text-white rounded flex items-center justify-center text-xs font-bold shadow transition-colors"
                              title="Delete Photo"
                            >
                              ✕
                            </button>
                          </div>

                          {/* Bottom row: Set as Cover */}
                          {!isCover && (
                            <button
                              type="button"
                              onClick={() => handleSetCover(imgUrl)}
                              className="w-full py-1 bg-amber-700 hover:bg-amber-800 text-white text-[11px] font-bold rounded uppercase tracking-wider transition-colors shadow"
                            >
                              Set as Cover
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Drag and Drop Zone */}
              <label 
                htmlFor="project-file-input"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`block w-full border-2 border-dashed px-4 py-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all rounded ${
                  isDragging 
                    ? 'border-amber-700 bg-amber-50/50 scale-[1.01]' 
                    : 'border-stone-300 bg-stone-50 hover:bg-stone-100 hover:border-amber-700'
                }`}
              >
                <input 
                  id="project-file-input"
                  type="file" 
                  accept="image/*"
                  multiple
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="hidden" 
                />
                {uploading ? (
                  <svg className="w-10 h-10 text-amber-700 mb-2 animate-hammer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m15 5 4 4" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.5 4.5 19.5 2.5a1 1 0 0 0-1.4 0l-6.5 6.5 4 4 6.5-6.5a1 1 0 0 0 0-1.4z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m11.5 9.5-8.5 8.5v3h3l8.5-8.5" />
                  </svg>
                ) : (
                  <svg className={`w-10 h-10 mb-2 transition-transform ${isDragging ? 'text-amber-700 scale-110' : 'text-stone-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
                <p className="text-stone-700 font-bold text-sm">
                  {uploading 
                    ? 'Uploading images... Please wait!' 
                    : isDragging 
                    ? 'Drop all images here' 
                    : images.length > 0 ? '+ Click or Drag to Add More Images' : 'Click or Drag to Select Project Images (Multiple Supported)'}
                </p>
                <p className="text-stone-400 text-xs mt-1">Select one or multiple images (JPG, PNG, WEBP, SVG) - Up to 10MB each</p>
              </label>
            </div>

            <div className="pt-4 flex justify-end gap-4">
              <button 
                type="button" 
                onClick={() => setShowForm(false)} 
                className="px-8 py-3 bg-stone-200 text-stone-700 font-bold uppercase tracking-wider text-sm hover:bg-stone-300 transition-colors cursor-pointer rounded"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={loading || uploading || images.length === 0}
                className="px-8 py-3 bg-stone-900 text-white font-bold text-sm uppercase tracking-wider rounded hover:bg-amber-800 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : (editingId ? 'Save Changes' : 'Save Project')}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white border border-stone-200 shadow-sm overflow-x-auto rounded">
          {projects.length === 0 ? (
            <div className="text-center py-10 text-stone-500">
              No projects added yet.
            </div>
          ) : (
            <table className="w-full text-left text-sm text-stone-600">
              <thead className="bg-stone-50 text-stone-900 uppercase tracking-wider font-bold border-b border-stone-200">
                <tr>
                  <th className="px-6 py-4">Image</th>
                  <th className="px-6 py-4">Project Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Photos</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {projects.map((project) => {
                  const formattedDate = new Date(project.createdAt).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric'
                  });

                  const count = Array.isArray(project.images) && project.images.length > 0 
                    ? project.images.length 
                    : (project.img ? 1 : 0);

                  return (
                    <tr key={project.id} className="hover:bg-stone-50 transition-colors">
                      <td className="px-6 py-3">
                        <div className="relative w-12 h-12 rounded overflow-hidden bg-stone-100 border border-stone-200">
                          <Image 
                            src={project.img || "/dummygorsel/factory_workshop.png"} 
                            alt={project.name} 
                            fill 
                            unoptimized 
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-stone-900">{project.name}</td>
                      <td className="px-6 py-4">{project.category}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-stone-100 text-stone-700 text-xs font-semibold">
                          <svg className="w-3.5 h-3.5 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {count} {count === 1 ? 'photo' : 'photos'}
                        </span>
                      </td>
                      <td className="px-6 py-4">{formattedDate}</td>
                      <td className="px-6 py-4">
                        {project.isFeatured && (
                          <span className="bg-amber-100 text-amber-800 text-[10px] px-2 py-1 rounded font-bold uppercase">Featured</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap space-x-3">
                        <button 
                          onClick={() => handleEditClick(project)}
                          className="text-amber-700 hover:text-amber-900 font-medium cursor-pointer"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(project.id)}
                          className="text-red-600 hover:text-red-800 font-medium cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}


