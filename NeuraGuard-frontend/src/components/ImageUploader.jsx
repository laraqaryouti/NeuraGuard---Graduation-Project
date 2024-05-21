import React, { useState } from "react";

function ImageUploader() {
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <div>
        {image && (
          <img
            src={image}
            alt="Preview"
            style={{ maxWidth: "100%", maxHeight: "200px" }}
          />
        )}
      </div>
    </div>
  );
}

export default ImageUploader;
