export const getImageUrl = (moviePoster) => {
    if(moviePoster === 'N/A') {
      return 'https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg';
    }
    return moviePoster;
  }