import React, { useState, useEffect, useContext, useRef } from "react";
import profileContext from "../context/profile/ProfileContext";

const Posts = () => {
  const context = useContext(profileContext);
  const {
    createPost,
    posts,
    getAllPosts,
    getLikes,
    likes,
    user,
    alert,
    showAlert,
  } = context;
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  //Handling Comments
  const [commentText, setCommentText] = useState({});
  const handleCommentChange = (e, postId) => {
    setCommentText({
      ...commentText,
      [postId]: e.target.value,
    });
  };
  const handleCommentSubmit = async (postId) => {
    const text = commentText[postId];
    if (!text?.trim()) {
      showAlert("Please enter a comment!", "danger");
      return;
    }
    try {
      const url = `http://localhost:5000/api/comments/add-comment/${postId}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ text }), // Send just the text
      });
      const json = await response.json();
      if (json.success === true) {
        // Match your backend response
        showAlert("Comment added successfully", "success");
        getAllPosts(); // Refresh posts to include new comment
        setCommentText({ ...commentText, [postId]: "" }); // Clear the input
      } else {
        showAlert("Failed to add comment", "danger");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Error adding comment. Please try again.");
    }
  };

  //Handling Posts(adding, editing and delete)
  const [editPostDescription, setEditPostDescription] = useState("");
  const [postIdToEdit, setPostIdToEdit] = useState(null);
  const [postDescription, setPostDescription] = useState("");
  const [iseditModalOpen, setIsEditModalOpen] = useState(false);
  const handlePostChange = (e) => {
    setPostDescription(e.target.value);
  };
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (postDescription.trim()) {
      await createPost(postDescription);
      setPostDescription(""); // Clear the input after submitting
      await getAllPosts();
    } else {
      showAlert("Please enter a post description!", "danger");
    }
  };
  const handleDelete = async (postId) => {
    const url = `http://localhost:5000/api/posts/deletepost/${postId}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    if (json === "Post Deleted Successfully") {
      showAlert("Post deleted successfully", "success");
      getAllPosts(); // Refresh the posts list after deletion
    } else {
      showAlert("Failed to delete post", "danger");
    }
  };
  const handleEdit = (postId, description) => {
    setPostIdToEdit(postId);
    setEditPostDescription(description);
    setIsEditModalOpen(true);
  };
  const handlePostUpdate = async () => {
    const url = `http://localhost:5000/api/posts/updatepost/${postIdToEdit}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ description: editPostDescription }),
    });
    const json = await response.json();
    if (json === "Post Updated Successfully") {
      showAlert("Post updated successfully", "success");
      getAllPosts(); // Refresh the posts after update
      setIsEditModalOpen(false); // Close the modal
    } else {
      showAlert("Failed to update post", "danger");
    }
  };

  //Handling Likes
  const addLike = async (postId) => {
    if (!postId) {
      showAlert("Invalid post ID", "danger");
      return;
    }
    const url = `http://localhost:5000/api/comments/add-like/${postId}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    if (json.success === true) {
      showAlert("Like added successfully", "success");
      getAllPosts();
    } else {
      // Handle the case when the like wasn't added successfully
      showAlert("Failed to add like", "danger");
    }
  };
  const removeLike = async (postId) => {
    if (!postId) {
      showAlert("Invalid post ID", "danger");
      return;
    }
    const url = `http://localhost:5000/api/comments/remove-like/${postId}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    if (json.success === true) {
      showAlert("Like removed successfully", "success");
      getAllPosts();
    } else {
      // Handle the case when the like wasn't added successfully
      showAlert("Failed to remove like", "danger");
    }
  };

  //Fetching usernames for comments and posts
  const [usernames, setUsernames] = useState({});
  const getUsername = async (id) => {
    const url = `http://localhost:5000/api/posts/getusername/${id}`;
    const response = await fetch(url);
    const json = await response.json();
    return json.name; // Assume the response contains the username
  };
  useEffect(() => {
    const fetchUsernames = async () => {
      const newUsernames = {};
      // Collect all unique user IDs from both posts and comments
      const userIds = new Set();
      posts.forEach((post) => {
        // Add post author
        userIds.add(post.user);
        // Add comment authors if post has comments
        if (post.comments && post.comments.length > 0) {
          post.comments.forEach((comment) => {
            userIds.add(comment.user);
          });
        }
      });
      // Convert Set to array and fetch all usernames
      const usernamesPromises = Array.from(userIds).map(async (userId) => {
        const username = await getUsername(userId);
        newUsernames[userId] = username;
      });
      await Promise.all(usernamesPromises);
      setUsernames(newUsernames);
    };
    if (posts.length > 0) {
      fetchUsernames();
    }
  }, [posts]);

  //Handling search
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isUserModal, setIsUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const searchRef = useRef(null);
  useEffect(() => {
    getAllPosts();
    getLikes();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResults([]);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const handleSearchChange = async (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    if (term.length) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/search-query/search?name=${encodeURIComponent(
            term
          )}`
        );
        if (response.ok) {
          let data = await response.json();
          data = data.filter((u) => u._id !== user._id);
          setSearchResults(data);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };
  const goToProfile = (userId) => {
    const userSelected = searchResults.find((u) => u._id === userId);
    if (userSelected) {
      setSelectedUser(userSelected);
      setIsUserModal(true);
    }
  };

  //Handling Friend Requests
  const addFriend = async (id) => {
    const host = "http://localhost:5000";
    const response = await fetch(`${host}/api/friends/send-request/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: user._id }),
    });
    const json = await response.json();
    if (json.message === "Friend request sent") {
      showAlert("Friend request sent!", "success");
    } else {
      showAlert(json.message, "danger");
    }
  };
  const removeFriend = async (friendID) => {
    const id = user._id;
    const url = `http://localhost:5000/api/friends/remove-friend/${friendID}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const json = await response.json();
    if (json.message === "Friend Removed") {
      showAlert("Friend removed from Friend List", "success");
    } else {
      showAlert("No Such friend Exists", "danger");
    }
  };

  return (
    <div>
      <div style={{ position: "relative" }}>
        {user && (
          <>
            <input
              className="input is-medium is-rounded is-hovered my-5"
              type="text"
              placeholder="Search for users..."
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ zIndex: 2 }}
              ref={searchRef}
            />
            {searchResults.length > 0 && (
              <div
                className="searchedresults"
                style={{
                  position: "absolute",
                  backgroundColor: "#15161a",
                  right: "5px",
                  left: "5px",
                  padding: "5px",
                  width: "50%",
                  zIndex: 1000,
                  borderRadius: "15px",
                }}
              >
                <ul className="list-group">
                  {searchResults.map((searchedUser) => (
                    <li
                      className="box"
                      key={searchedUser._id}
                      onClick={() => goToProfile(searchedUser._id)}
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      {searchedUser.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
      <div className="card">
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-48x48">
                <img
                  src="https://bulma.io/assets/images/placeholders/96x96.png"
                  alt="Placeholder image"
                />
              </figure>
            </div>
            <div className="media-content is-flex is-justify-content-space-between is-flex-wrap-wrap">
              <div className="media-left-content">
                <p className="title is-4 has-text-weight-medium">
                  {user?.username}
                </p>
                <p className="subtitle is-5 has-text-weight-light">
                  {user?.name}
                </p>
              </div>

              {/* For Desktop */}
              <div className="media-right-content is-hidden-mobile">
                <p className="title is-6 has-text-weight-light">
                  <strong>Profession:</strong> {user?.profession}
                </p>
                <p className="title is-6 has-text-weight-light">
                  <strong>Location:</strong> {user?.location}
                </p>
                <p className="title is-6 has-text-weight-light">
                  <strong>Phone:</strong> {user?.phone}
                </p>
              </div>

              {/* For Mobile */}
              <div className="is-hidden-desktop my-5">
                <p className="title is-6 has-text-weight-light">
                  <strong>Profession:</strong> {user?.profession}
                </p>
                <p className="title is-6 has-text-weight-light">
                  <strong>Location:</strong> {user?.location}
                </p>
                <p className="title is-6 has-text-weight-light">
                  <strong>Phone:</strong> {user?.phone}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handlePostSubmit}>
        <div className="my-3">
          <textarea
            placeholder="What's on your mind?"
            className="textarea"
            id="postDescription"
            value={postDescription}
            onChange={handlePostChange}
            rows="3"
          ></textarea>
        </div>

        <button
          type="submit"
          className="button is-success mt-4"
          style={{ paddingBottom: "-10px" }}
        >
          <h1 className="display-6" style={{ fontSize: "20px" }}>
            Share <i className="fa-solid fa-share fa-2xs" />
          </h1>
        </button>
      </form>
      <div className="is-size-2 mt-4">Feed Below</div>
      <div
        style={{
          maxHeight: "400px",
          overflowY: "scroll",
        }}
      >
        {sortedPosts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "20px", color: "#888" }}>
            <h5>No posts available</h5>
          </div>
        ) : (
          sortedPosts
            .filter(
              (post) =>
                user &&
                (user.friends.some((friend) => friend._id === post.user) ||
                  post.user === user._id)
            )
            .map((post, index) => (
              <div className="card mx-1 my-3">
                <div className="card-content">
                  <div className="media">
                    <div className="media-content is-flex is-justify-content-space-between">
                      <p className="title is-4">{usernames[post.user]}</p>
                      {user && user._id === post.user && (
                        <>
                          <div>
                            <button
                              className="button is-danger is-small mx-3"
                              style={{ width: "auto" }}
                              onClick={() => handleDelete(post._id)} // Handle the delete functionality
                            >
                              Delete <i className="fa-solid fa-trash fa-lg" />
                            </button>
                            <button
                              className="button is-success is-small"
                              style={{ width: "auto" }}
                              onClick={() =>
                                handleEdit(post._id, post.description)
                              }
                            >
                              Edit <i className="fa-solid fa-pen fa-lg" />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="content is-size-4">
                    {post.description}
                    <br />
                  </div>
                  <p className="is-size-7">{formatDate(post.date)}</p>
                  {post.comments && post.comments.length > 0 && (
                    <div className="mx-2 my-5">
                      {post.comments.map((comment, index) => (
                        <div key={index} style={{ marginBottom: "5px" }}>
                          <p className="mb-0">
                            <strong>{usernames[comment.user]}:</strong>{" "}
                            {comment.text}
                          </p>
                          <small className="text-muted">
                            <i className="fa-solid fa-stopwatch fa-sm" />{" "}
                            {new Date(comment.date).toLocaleString()}
                          </small>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="my-5">
                    <textarea
                      className="textarea"
                      rows="1"
                      placeholder="Add a comment..."
                      value={commentText[post._id] || ""}
                      onChange={(e) => handleCommentChange(e, post._id)}
                    ></textarea>
                    <button
                      className="button is-warning is-small is-light my-5"
                      onClick={() => handleCommentSubmit(post._id)}
                    >
                      Comment <i className="fa-solid fa-comment fa-lg" />
                    </button>

                    {user &&
                    post.likes &&
                    post.likes.likedBy &&
                    post.likes.likedBy.includes(user._id) ? (
                      <>
                        <button
                          className="button is-danger is-small is-light my-5 mx-3"
                          onClick={() => removeLike(post._id)}
                        >
                          Unlike <i className="fa-solid fa-heart-crack fa-lg" />
                        </button>
                        <button className="button is-success is-small is-light my-5">
                          {likes[post._id] || 0}
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="button is-success is-small is-light my-5 mx-3"
                          onClick={() => addLike(post._id)}
                        >
                          Like <i className="fa-solid fa-heart fa-lg" />
                        </button>
                        <button className="button is-success is-small is-light my-5">
                          {likes[post._id]}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
        )}
      </div>
      {isUserModal && (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title is-size-4 has-text-weight-light">
                User Profile
              </p>
            </header>
            <section className="modal-card-body">
              <div className="columns is-vcentered">
                {" "}
                {/* `columns` creates a flex container for the columns */}
                <div className="column">
                  {" "}
                  <div className="is-size-4 my-2">
                    <strong>Name:</strong> {selectedUser.name}
                  </div>
                  <div className="is-size-4">
                    <strong>Userame:</strong> {selectedUser.username}
                  </div>
                  <div className="is-size-4 my-2">
                    <strong>Profession:</strong> {selectedUser.profession}
                  </div>
                  <div className="is-size-4">
                    <strong>Location:</strong> {selectedUser.location}
                  </div>
                  <div className="is-size-4 my-2">
                    <strong>Phone:</strong> {selectedUser.phone}
                  </div>
                  {user.friends.some(
                    (friend) => friend.name === selectedUser.name
                  ) ? (
                    <button
                      className="button is-danger my-3"
                      onClick={() => removeFriend(selectedUser._id)}
                    >
                      Remove Friend
                    </button>
                  ) : selectedUser.friendRequests.some(
                      (request) => request === user._id
                    ) ? (
                    <button className="button is-warning my-3" disabled>
                      Friend Request Sent
                    </button>
                  ) : (
                    <button
                      className="button is-success my-3"
                      onClick={() => addFriend(selectedUser._id)}
                    >
                      {" "}
                      Add Friend <i className="fa-solid fa-user-plus fa-sm" />
                    </button>
                  )}
                </div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <div className="buttons">
                <button
                  className="button is-danger is-outlined"
                  onClick={() => setIsUserModal(false)}
                >
                  Close
                </button>
              </div>
            </footer>
          </div>
        </div>
      )}
      {iseditModalOpen && (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title is-size-4 has-text-weight-light">
                Edit Post
              </p>
            </header>
            <section className="modal-card-body">
              <div className="columns is-vcentered">
                {" "}
                {/* `columns` creates a flex container for the columns */}
                <div className="column">
                  {" "}
                  <textarea
                    className="textarea"
                    placeholder="Enter text here to update post..."
                    value={editPostDescription}
                    onChange={(e) => setEditPostDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <div className="buttons">
                <button
                  className="button is-success"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Go Back
                </button>

                <button className="button is-success is-outlined" onClick={handlePostUpdate}>
                  Update
                </button>
              </div>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;
