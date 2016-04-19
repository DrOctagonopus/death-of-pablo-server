# Schema
Artist {
  name:    String   // Artist name \n
  songIDs: [String] // IDs referring to the artist's songs \n
}

Song {
  title:     String    // Song title \n
  lyrics:    String    // Song lyrics \n
  artistIDs: [String]  // IDs referring to the song's artists \n
}

User {
  username:     String,  // Username \n
  passwordHash: [String] // \n
  favSongIDs:   [String] // IDs referring to user's favourited songs \n
  favArtistIDs: [String] // IDs referring to user's favourited artists \n
}

## GET queries supported for songs and artists
where \n
count \n
skip \n
limit \n
sort \n
select \n

/songs \n
 GET

/artists
 GET

/users/:userid
 GET     Get user details
 POST    Create a new user
 PUT     Edit existing user
 DELETE  Delete user