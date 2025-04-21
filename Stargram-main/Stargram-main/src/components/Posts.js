import React, { useState, useEffect } from "react";
import { db } from "../firebase"; 
import { collection, getDocs, addDoc, serverTimestamp, query, orderBy } from "firebase/firestore"; 
import { useAuth } from "../context/AuthContext"; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import '../styles/Posts.css';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [newPostText, setNewPostText] = useState(""); 
  const [imageUrl, setImageUrl] = useState(""); 
  const [youtubeLink, setYoutubeLink] = useState(""); 
  const [uploading, setUploading] = useState(false); 

  const { currentUser } = useAuth(); 
  
  useEffect(() => {
    const fetchPosts = async () => {
      const postsQuery = query(collection(db, "posts"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(postsQuery);
      const postsArray = [];
      querySnapshot.forEach((doc) => {
        postsArray.push(doc.data());
      });
      setPosts(postsArray);
    };
    fetchPosts();
  }, []);

  const handleYouTubeLink = (link) => {
    const youtubeRegex = /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^/]+\/\S+\/|(?:v|e(?:mbed)?)\/|(?:[\w-]{11}))|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = link.match(youtubeRegex);
    return match ? match[1] : "";  
  };


  const createPost = async (event) => {
    event.preventDefault();
    setUploading(true);

    let imageURL = imageUrl;  

    const processedYouTubeLink = handleYouTubeLink(youtubeLink);

    try {
      await addDoc(collection(db, "posts"), {
        text: newPostText,
        imageUrl: imageURL, // Guardar la URL de la imagen
        youtubeLink: processedYouTubeLink, // Guardar solo el ID del video
        timestamp: serverTimestamp(), // Timestamp del post
        userId: currentUser.uid, // ID del usuario
        userName: currentUser.displayName, // Nombre del usuario
      });

      // Actualizar la lista de posts
      setPosts([{ 
        text: newPostText, 
        imageUrl: imageURL, 
        youtubeLink: processedYouTubeLink,
        userName: currentUser.displayName,
        timestamp: serverTimestamp(),
      }, ...posts]);

      setNewPostText(""); 
      setImageUrl(""); 
      setYoutubeLink(""); 
    } catch (error) {
      console.error("Error al crear el post:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mt-5 posts-container">
      <h1 className="mb-4 text-center custom-heading">Publicaciones</h1>

      {/* Formulario de creación de post */}
      {currentUser && (
        <div className="card mb-4 custom-card">
          <div className="card-body">
            <form onSubmit={createPost}>
              <div className="mb-3 position-relative">
                <i className="bi bi-pencil position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                <textarea
                  className="form-control custom-input ps-5"
                  placeholder="Escribe tu post..."
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3 position-relative">
                <i className="bi bi-image position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                <input
                  className="form-control custom-input ps-5"
                  type="text"
                  placeholder="URL de la imagen (opcional)"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </div>

              <div className="mb-3 position-relative">
                <i className="bi bi-youtube position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                <input
                  className="form-control custom-input ps-5"
                  type="text"
                  placeholder="Enlace de YouTube (opcional)"
                  value={youtubeLink}
                  onChange={(e) => setYoutubeLink(e.target.value)}
                />
              </div>

              <button className="btn custom-button w-100" type="submit" disabled={uploading}>
                {uploading ? "Publicando..." : "Publicar"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Posts listados */}
      <div className="posts-list">
        {posts.map((post, index) => (
          <div key={index} className="card mb-3 custom-card">
            <div className="card-body">
              <h5 className="card-title custom-title">{post.userName}</h5>
              <p className="card-text custom-text">{post.text}</p>
              {post.imageUrl && <img className="img-fluid rounded mb-2" src={post.imageUrl} alt="Post" />}
              {post.youtubeLink && (
                <iframe
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/${post.youtubeLink}`}
                  title="YouTube video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="mt-3"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
