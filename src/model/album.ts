type Album = {
  id: string;
  artist: string;
  album: string;
  duration: string;
  cover: string;
  price: number;
  genre:
    | 'rock'
    | 'pop'
    | 'hipHop'
    | 'randB'
    | 'electronic'
    | 'metal'
    | 'jazz'
    | 'latin';
  recordCompany: string;
  producer: string;
  moreInfo: string;
};
