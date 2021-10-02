const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});
  for (let blog of helper.initBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
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
    expect(response.body).toHaveLength(helper.initBlogs.length);
  });

  test("author of the first blog", async () => {
    const blogsAtEnd = await helper.blogsInDb();
    const authors = blogsAtEnd.map((blog) => blog.author);
    expect(authors).toContain("Nemo");
  });

  test("id should be defined", async () => {
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd[0].id).toBeDefined();
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

    const blogsAtEnd = await helper.blogsInDb();
    const titles = blogsAtEnd.map((blog) => blog.title);

    expect(blogsAtEnd).toHaveLength(helper.initBlogs.length + 1);
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

    const blogsAtEnd = await helper.blogsInDb();
    const newAddedBlog = blogsAtEnd.find(
      (blog) => blog.title === "Do not have likes property"
    );

    expect(blogsAtEnd).toHaveLength(helper.initBlogs.length + 1);
    expect(newAddedBlog.likes).toBe(0);
  });

  test("add new blog without title, return status 400", async () => {
    const newBlog = {
      author: "Nemo",
      url: "notitle.com",
    };

    await api.post("/api/blogs").send(newBlog).expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initBlogs.length);
  });

  test("add new blog without url, return status 400", async () => {
    const newBlog = {
      author: "Nemo",
      title: "No URL",
    };

    await api.post("/api/blogs").send(newBlog).expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initBlogs.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
