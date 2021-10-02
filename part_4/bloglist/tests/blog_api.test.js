const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

const initBlogs = [
  {
    author: "Nemo",
    title: "Museum",
    url: "museum.com",
    likes: 4,
  },
  {
    author: "Zelda",
    title: "Hanoi in the rain",
    url: "hanoi.com.vn",
    likes: 6,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initBlogs[1]);
  await blogObject.save();
});

describe("GET", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("there are two blogs", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(initBlogs.length);
  });

  test("author of the first blog", async () => {
    const response = await api.get("/api/blogs");
    const authors = response.body.map((blog) => blog.author);
    expect(authors).toContain("Nemo");
  });

  test("id should be defined", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].id).toBeDefined();
  });
});

describe("POST", () => {
  test("add new blog", async () => {
    const newBlog = {
      author: "Nemo",
      title: "Learning fullstack",
      url: "learning.com",
      likes: 13,
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    const titles = response.body.map((blog) => blog.title);

    expect(response.body).toHaveLength(initBlogs.length + 1);
    expect(titles).toContain("Learning fullstack");
  });

  test("add new blog without likes property, default likes should be 0", async () => {
    const newBlog = {
      author: "Nemo",
      title: "Do not have likes property",
      url: "likes.com",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    const newAddedBlog = response.body.find(
      (blog) => blog.title === "Do not have likes property"
    );

    expect(response.body).toHaveLength(initBlogs.length + 1);
    expect(newAddedBlog.likes).toBe(0);
  });

  test("add new blog without title, return status 400", async () => {
    const newBlog = {
      author: "Nemo",
      url: "notitle.com",
    };

    await api.post("/api/blogs").send(newBlog).expect(400);

    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(initBlogs.length);
  });

  test("add new blog without url, return status 400", async () => {
    const newBlog = {
      author: "Nemo",
      title: "No URL",
    };

    await api.post("/api/blogs").send(newBlog).expect(400);

    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(initBlogs.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
