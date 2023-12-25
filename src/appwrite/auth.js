import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

// all the configuration coming from appwrite docs

// CONFIGURATION FOR USER

export class AuthService {
  client = new Client();
  account; // variable for account

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  // SignUp / Signin with google function
  async googleSignin() {
    try {
      const response = await this.account.createOAuth2Session(
        "google",
        "http://localhost:5173/",
        "http://localhost:5173/login"
      );
      if (!response) throw Error;
      // console.log("Response ", response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  // create account function
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // return another method , if has account then login
        return this.login(email, password);
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  // create login function
  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  // function to get current user
  async getcurrentUser() {
    try {
      return this.account.get();
    } catch (error) {
      console.log("Apwrite service :: getcurrentUser :: ", error);
    }
    // return null; // this will run always
  }

  // function to logout
  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("Apwrite service :: logout :: " + error);
    }
  }
}

const authService = new AuthService();

export default authService;
