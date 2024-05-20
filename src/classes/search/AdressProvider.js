class AdressProvider {
  static async seach(text) {
    try {
      const response = await fetch(`https://geocode.maps.co/search?q=${text}&api_key=662138b3d1ef7686800322rnpaf1e1e`);
      const data = await response.json();
      const result = [];
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        result.push({
          type: 'address',
          label: item.display_name.substring(0, 72),
          lat: item.lat,
          lng: item.lon,
        });
      }
      return result;
    }
    catch {
      return [];
    }
  }
}

export default AdressProvider;