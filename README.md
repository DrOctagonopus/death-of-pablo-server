# Schema
Artist {
  name:    String   // Artist name
  songIDs: [String] // IDs referring to the artist's songs
}

Song {
  title:     String    // Song title
  lyrics:    String    // Song lyrics
  artistIDs: [String]  // IDs referring to the song's artists
}

User {
  username:     String,  // Username
  passwordHash: [String] // 
  favSongIDs:   [String] // IDs referring to user's favourited songs
  favArtistIDs: [String] // IDs referring to user's favourited artists
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