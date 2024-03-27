import { useAction, useUser } from "@gadgetinc/react";
import { api } from "../api";
import { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});

  const user = useUser(api);
  const userId = user?.id;

  const [{ fetching, error }, act] = useAction(api.post.create);

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      void act({
        title: title,
        body: body,
        category: category,
        user: {
          _link: userId,
        },
        image: {
          file: file
        },
      });

      // Clear inputs
      setFile(null);
      setTitle(null);
      setBody(null);
      setCategory(null);
  
      setSuccessMessage('Article posted successfully!');
      // Set timeout to clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } else {
      setErrors(validationErrors);
    }
  }

  // Form validation function
  const validateForm = () => {
    const errors = {};

    if (!title.trim()) {
      errors.title = "Title is required";
    }

    if (!body.trim()) {
      errors.body = "Body is required";
    }
    
    if (!category.trim()) {
      errors.category = "Category is required";
    }
    
    if (!file) {
      errors.file = "Image is required";
    }

    return errors;
  };

  useEffect(() => {
    document.title = `Create new article | ${process.env.GADGET_PUBLIC_APP_SLUG}`;
  }, []);

  return user ? (
    <div style={{ maxWidth: "720px" }}>
      <h1 style={{ marginTop: "20px", marginBottom: "20px" }}>Create an article</h1>
      {error && <p class="error">Error: {error.message}</p>}
      {successMessage && !error && <div className="success-card">{successMessage}</div>}
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="new-post-form"
      >
        <div className="image preview">
          {file && <img src={URL.createObjectURL(file)} alt="image priview" style={{ maxHeight: "200px" }} />}
        </div>
        <div className="box input-title">
          <label htmlFor="title">Title</label>
          <input id="title" type="text" onChange={(e) => setTitle(e.target.value)} />
          {errors.title && <p className="error">{errors.title}</p>}
        </div>
        <div className="box">
          <label htmlFor="image">Upload Image</label>
          <input id="image" type="file" name="image" onChange={(e) => setFile(e.target.files[0])} />
          {errors.file && <p className="error">{errors.file}</p>}
        </div>
        <div className="box" >
          <label htmlFor="category">Choose category</label>
          <select id="category" name="category" onChange={(e) => setCategory(e.target.value)}>
            <option value="">--Please choose an option--</option>
            <option value="Tech">Tech</option>
            <option value="Finance">Finance</option>
            <option value="Sport">Sport</option>
            <option value="Health">Health</option>
            <option value="Events">Events</option>
          </select>
          {errors.category && <p className="error">{errors.category}</p>}
        </div>
        <div className="box input-content">
          <label htmlFor="body">Body</label>
          <textarea id="body" rows="5" style={{ marginBottom: "20px" }} onChange={(e) => setBody(e.target.value)} />
          {errors.body && <p className="error">{errors.body}</p>}
        </div>
        <button type="submit">Post article</button>
      </form>
      {fetching && <div><BeatLoader color="#2e86de" /></div>}
    </div>
  ) : null;
}

export default CreatePostPage;