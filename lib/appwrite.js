import { Client, Account, ID, Avatars, Databases } from 'react-native-appwrite';


export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.wilfredeveloper.aora',
    projectId: '6675dd46002cde09ec0a',
    databaseId: '6675dff100004e3de74a',
    userCollectionId: '6675e023002da0e23fd7',
    videoCollectionId: '6675e040002f85477f1c',
    storageId: '6675e1aa00211826d5b2',
}


// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

const createUser = async(username, email, password) => {
    console.log(email, password, username)
        // Register User
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if (!newAccount) {
            throw new Error('Unable to create account')
        }

        console.log("New Account", newAccount.$id)

        const avatarURL = avatars.getInitials(username)

        console.log("Avatar URL", avatarURL)

        await signIn(email, password);

        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(), {
                accountId: newAccount.$id,
                username,
                email,
                avatar: avatarURL,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            }
        )

        return newUser;
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export async function signIn(email, password) {
    try {
        const currentSession = await account.getSession('current');
        if (currentSession) {
            console.log('User already logged in', currentSession)
            return currentSession;
        }
        const session = await account.createEmailPasswordSession(email, password)
        return session
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export { client, account, createUser }