// const functions = require("firebase-functions");
// const firebase = require("firebase-admin");
// const algoliasearch = require("algoliasearch");

// const APP_ID = functions.config().algolia.appid;
// // const SEARCH_API_KEY = functions.config().algolia.searchapikey;
// const ADMIN_API_KEY = functions.config().algolia.adminapikey;

// const firebaseConfig = {
//   apiKey: "AIzaSyD4rpfc9MEvr96lL-HJ6J7Qubv4lxRfZw0",
//   authDomain: "dreammate-b3ce5.firebaseapp.com",
//   projectId: "dreammate-b3ce5",
//   storageBucket: "dreammate-b3ce5.appspot.com",
//   messagingSenderId: "158988281321",
//   appId: "1:158988281321:web:1a80463b086471277bd778",
//   measurementId: "G-RPNYZ46LE3",
// };

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

// const client = algoliasearch(APP_ID, ADMIN_API_KEY);
// const index = client.initIndex("dev_POSTS");
// const firestore = firebase.firestore();

// exports.initializeAlgoliaIndex = functions.https.onRequest((req, res) => {
//   // Get all documents in the 'posts' collection
//   firestore.collection("posts").get()
//       .then((snapshot) => {
//         // Create an array of all the documents
//         const objects = snapshot.docs.map((doc) => {
//           return {
//             objectID: doc.id,
//             createdAt: doc.data().createdAt,
//             creator: doc.data().creator,
//             description: doc.data().description,
//             lookingFor: doc.data().lookingFor,
//             school: doc.data().school,
//             tags: doc.data().tags,
//             thumbnailName: doc.data().thumbnailName,
//             thumbnailURL: doc.data().thumbnailURL,
//             title: doc.data().title,
//             website: doc.data().website,
//           };
//         });

//         // Add the documents to the Algolia index
//         return index.saveObjects(objects);
//       })
//       .then(() => {
//         res.send("Algolia index initialized");
//       })
//       .catch((err) => {
//         console.error(err);
//         res.status(500).send(err);
//       });
// });

// exports.syncPostsToAlgolia = functions.firestore
//     .document("posts/{postId}")
//     .onWrite((change, context) => {
//       // Get the post document
//       const post = change.after.exists ? change.after.data() : null;
//       const postId = context.params.postId;

//       // If the post has been deleted, remove it from the index
//       if (!post) {
//         return index.deleteObject(postId);
//       }

//       // Add or update the post in the index
//       return index.saveObject({
//         objectID: postId,
//         createdAt: post.createdAt,
//         creator: post.creator,
//         description: post.description,
//         lookingFor: post.lookingFor,
//         school: post.school,
//         tags: post.tags,
//         thumbnailName: post.thumbnailName,
//         thumbnailURL: post.thumbnailURL,
//         title: post.title,
//         website: post.website,
//       });
//     });
