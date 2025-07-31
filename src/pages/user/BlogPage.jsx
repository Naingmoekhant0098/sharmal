import React, { useEffect, useState } from "react";
import { Container, Typography, Grid, Button } from "@mui/material";
import UserNavbarComponent from "../../components/Navbar/UserNavbarComponent";
import FooterComponent from "../../components/Footer/FooterComponent";
import { GetBlogAPI } from "../../api/blog/BlogController";

export default function BlogPage({ history }) {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await GetBlogAPI();
        setBlogs(response);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to load blogs. Please try again later.");
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      <UserNavbarComponent history={history} />
      <Container>
        {error ? (
          <Typography color="error">{error}</Typography>
        ) : blogs?.length > 0 ? (
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {blogs.map((blog) => (
              <Grid item xs={12} sm={6} md={4} key={blog.id}>
                <div
                  style={{
                    border: "1px solid #ddd",
                    padding: 16,
                    borderRadius: 8,
                    marginBottom: 10,
                  }}
                  onClick={() =>
                    history.push({
                      pathname: `/blog/detail/${blog?.Id}`,
                      state: { data: blog }, // pass the blog data as state
                    })
                  }
                >
                  <img
                    src={`data:image/jpeg;base64,${blog.Image}`}
                    alt={blog?.Title}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />

                  <Typography variant="h6" gutterBottom>
                    {blog.Title}
                  </Typography>
                  <Typography variant="body2">
                    {blog.Description.substring(0, 80)}...{" "}
                    {/* Show short version */}
                  </Typography>
                  <Button
                    size="small"
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      history.push({
                        pathname: `/blog/detail/${blog?.Id}`,
                        state: { data: blog }, // pass the blog data as state
                      });
                    }}
                  >
                    See More
                  </Button>
                </div>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography>Loading blogs...</Typography>
        )}
      </Container>
      {blogs?.length > 0 && <FooterComponent />}
    </div>
  );
}
