import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategories = createAsyncThunk("fetchCategories", async (__, thunkAPI) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/category/getAll`);
        const data = res.data;
        if (res.data.success) {
            return data.data;
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.msg || "Something went wrong");

    }
})
export const fetchSubCategoriesbyCategoryId = createAsyncThunk("fetchSubCategoriesbyCategoryId", async (id, thunkAPI) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/subCategory/${id}`);
        const data = res.data;
        if (res.data.success) {
            return data.data;
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.msg || "Something went wrong");

    }
})
export const fetchlandingPageCategories = createAsyncThunk("fetchlandingpageCategories", async (_, thunkAPI) => {

    
    try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/subCategory/landingCategories`);
        const data = res.data;
        if (res.data.success) {
            return data.data;
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.msg || "Something went wrong");

    }
})
export const fetchlandingPageCategoriesforCompany = createAsyncThunk(
  "fetchlandingPageCategoriesforCompany",
  async (id, thunkAPI) => {
   
  try {
  // Step 1: Get all subcategories for the company
  const subCatRes = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/subCategory/company/${id}`
  );
  const subCategories = subCatRes.data?.data;

  if (!subCatRes.data.success || !Array.isArray(subCategories)) {
    throw new Error("Failed to fetch subcategories");
  }

  // Step 2: Fetch ALL brands (for lookup)
  const brandRes = await axios.get(`${import.meta.env.VITE_BASE_URL}/brands`);
  const brands = brandRes.data?.brands || [];

  // Create a brand lookup map: { brandId: brandData }
  const brandMap = {};
  brands.forEach((brand) => {
    brandMap[brand._id] = brand;
  });

  // Step 3: Fetch items per subcategory and enrich with brand info
  const enrichedSubCategories = await Promise.all(
    subCategories.map(async (subcat) => {
      try {
        const itemsRes = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/items/item-List/${subcat._id}`
        );
        const items = itemsRes.data?.data || [];

        // Enrich each item with its brand info
        const enrichedItems = items.map((item) => ({
          ...item,
          brandInfo: brandMap[item.brand] || null,
        }));

        return {
          ...subcat,
          items: enrichedItems,
        };
      } catch {
        return {
          ...subcat,
          items: [],
        };
      }
    })
  );

  return enrichedSubCategories;
} catch (error) {
  return thunkAPI.rejectWithValue(
    error?.response?.data?.msg || error.message || "Something went wrong"
  );
}

  }
);


const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        subCategories: [],
        landingpageCategories: [],
        loading: false,
        error: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
                state.error = null;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchSubCategoriesbyCategoryId.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSubCategoriesbyCategoryId.fulfilled, (state, action) => {
                state.loading = false;
                state.subCategories = action.payload;
                state.error = null;
            })
            .addCase(fetchSubCategoriesbyCategoryId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchlandingPageCategoriesforCompany.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchlandingPageCategoriesforCompany.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
                state.error = null;
            })
            .addCase(fetchlandingPageCategoriesforCompany.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(fetchlandingPageCategories.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchlandingPageCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.landingpageCategories = action.payload;
                const allSubCategories = action.payload.flatMap(category =>
                    category.subCategories.map(sub => ({
                        _id: sub._id,
                        name: sub.name
                    }))
                );

                // ✅ Store all subcategories separately
                state.subCategories = allSubCategories;
                state.error = null;
            })
            .addCase(fetchlandingPageCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default categorySlice.reducer;