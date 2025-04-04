import { useState } from "react";
import AddLoader from "../components/loader/AddLoader";
import { backendUrl } from "../App";
import axios from "axios";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [loader, setLoader] = useState(false);
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    subCategory: "",
    sizes: [],
    bestSeller: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSizeToggle = (size) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("subCategory", formData.subCategory);
    formDataToSend.append("sizes", JSON.stringify(formData.sizes));
    formDataToSend.append("bestSeller", formData.bestSeller ? "true" : "false");

    if (image1) formDataToSend.append("image1", image1);
    if (image2) formDataToSend.append("image2", image2);
    if (image3) formDataToSend.append("image3", image3);
    if (image4) formDataToSend.append("image4", image4);

    try {
      const response = await axios.post(
        `${backendUrl}/api/v1/products/addProduct`,
        formDataToSend,
        {
          headers: {
            token: token,
          },
        }
      );
      if (response.status === 200) {
        setLoader(false);
        formData.name = "";
        formData.description = "";
        formData.price = "";
        formData.category = "";
        formData.subCategory = "";
        formData.sizes = [];
        formData.bestSeller = false;
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      }
      toast.success(response.data.message);
    } catch (error) {
      setLoader(false);
      console.error("Error submitting data:", error);
      toast.error(error.response?.data?.messag);
    }
  };

  const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

  return loader ? (
    <AddLoader />
  ) : (
    <div className="w-full h-[135vh] flex flex-col items-center p-6 bg-[#F7F0E7]">
      <h2 className="text-2xl font-bold mb-4">Add New Item</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-2/3"
      >
        <h3 className="text-lg font-semibold mb-2">Upload Images</h3>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt="upload"
              className="cursor-pointer max-h-38 w-40"
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt="upload"
              className="cursor-pointer max-h-38 w-40"
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt="upload"
              className="cursor-pointer max-h-38 w-40"
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt="upload"
              className="cursor-pointer max-h-38 w-40"
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>

        <h3 className="text-lg font-semibold mb-2 mt-6">About Product</h3>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <h3 className="text-lg font-semibold mb-2 mt-2">Price</h3>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
          required
        />

        <h3 className="text-lg font-semibold mb-2">Categories</h3>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
          required
        >
          <option
            value=""
            className={`${!formData.category ? "text-gray-400" : ""}`}
          >
            Select Category
          </option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>

        <h3 className="text-lg font-semibold mb-2 mt-4">Sub-Categories</h3>
        <select
          name="subCategory"
          value={formData.subCategory}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
          required
        >
          <option
            value=""
            className={`${!formData.subCategory ? "text-gray-400" : ""}`}
          >
            Select Sub-Category
          </option>
          <option value="Topwear">Topwear</option>
          <option value="Bottomwear">Bottomwear</option>
          <option value="Winterwear">Winterwear</option>
          {/* <option value="Hoodies">Hoodies</option>
          <option value="Pants">Pants</option>
          <option value="Jeans">Jeans</option>
          <option value="Shorts">Shorts</option>
          <option value="shoe">Shoes</option>
          <option value="sneakers">Sneakers</option>
          <option value="slippers">Slippers</option>
          <option value="blazers">Blazers</option> */}
        </select>

        <h3 className="text-lg font-semibold mb-2 mt-4">Available Sizes</h3>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {sizeOptions.map((size) => (
            <button
              type="button"
              key={size}
              onClick={() => handleSizeToggle(size)}
              className={`p-2 border rounded hover:cursor-pointer ${
                formData.sizes.includes(size)
                  ? "bg-[#9E8B6A] text-white"
                  : "bg-white"
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="bestSeller"
            checked={formData.bestSeller}
            onChange={handleChange}
            className="peer accent-[#9E8B6A] hover:cursor-pointer"
          />
          Bestseller
        </label>

        <button
          type="submit"
          className="w-full bg-[#B59D7F] text-white p-2 mt-4 rounded hover:bg-[#9E8B6A] hover:cursor-pointer"
        >
          Add to Store
        </button>
      </form>
    </div>
  );
};

export default Add;
