# Schema
Artist {
  name:        String   // Artist name  
  songIds:     [String] // IDs referring to the artist's songs
  description: String
}

Song {
  title:     String    // Song title  
  lyrics:    String    // Song lyrics  
  artistIds: [String]  // IDs referring to the song's artists  
  rank:      Number
  score:     Number
  rapDesnity: Number
  rhymesPerVerse: Number
  vocabLevel: Number
}

User {
  username:     String,  // Username  
  passwordHash: [String] //  
  favSongIDs:   [String] // IDs referring to user's favourited songs  
  favArtistIDs: [String] // IDs referring to user's favourited artists
  aboutMe:      String
  thumbnailUrl: String
}

## GET queries supported for songs and artists
where  
count  
skip  
limit  
sort  
select  

/songs  
 GET  

/artists  
 GET  

/users/:userid  
 GET     Get user details  
 POST    Create a new user  
 PUT     Edit existing user  
 DELETE  Delete user  
