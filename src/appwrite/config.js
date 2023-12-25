import { Client, ID, Databases, Storage, Query } from "appwrite";
import conf from "../conf/conf";

// CONFIGURATION FOR DATABASE

export class Service {
  client = new Client();
  databases; // variable for db
  bucket; // variable for storage

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // method to create a blog
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: createPost :: error", error);
    }
  }

  // method to update blog / document
  async updatePost(slug, { title, content, featuredImage, status }) {
    // these properties will be updated
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug, // document id)
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost ::", error);
    }
  }

  // method to delete blog / post
  async deletePost(slug) {
    try {
      await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true; // deleted then return true and will be handeled in frontend
    } catch (error) {
      console.log("Appwrite service :: deletePost ::", error);
      return false;
    }
  }

  // method to get single post
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite service :: getPost ::", error);
    }
  }

  // get all posts using queries
  async getPosts(queries = [Query.equal("status", "active")]) {
    // passing queries as arguments in (key , value) . Also can multiple queries
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite service :: getAllPosts ::", error);
      return false;
    }
  }

  // file upload in storage/bucket
  async uploadFile(file) {
    try {
      return this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file);
    } catch (error) {
      console.log("Appwrite service :: uploadFile ::", error);
      return false;
    }
  }

  // file upload
  async deleteFile(fileId) {
    try {
      this.bucket.createFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteFile ::", error);
      return false;
    }
  }

  // file preview
  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const service = new Service();

export default service;
