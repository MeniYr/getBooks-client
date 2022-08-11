import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit"
import { API_URL, BOOKS } from "../../constants/globalinfo/URL`S"


import { doApiGet, doApiMethod} from "../../services/apiService"



export const addBook = createAsyncThunk(
    'books/addBook', async (_dataBody) => {
        try {
            let data = await (await doApiMethod(`${BOOKS}/add`, "POST", _dataBody)).data
            console.log(data)
            return data
        }
        catch (err) {
            throw err?.response?.data[0]?.message
        }
    }
)

export const getBooks = createAsyncThunk(
    'books/getBooks', async () => {
        try {
            let data = await (await doApiGet(BOOKS)).data
            console.log(data)
            return data
        }
        catch (err) {
            throw err?.response?.data[0]?.message
        }
    }
)

export const srchBooks = createAsyncThunk(
    'books/srchBooks', async (search_experetion) => {
        try {
            let data = await (await doApiMethod(`${BOOKS}/srch`, "POST", search_experetion)).data
            console.log(data)
            return data
        }
        catch (err) {
            throw err?.response?.data[0]?.message
        }
    }
)


const booksSlice = createSlice({
    name: 'books',
    initialState: {
        books: [],
        userBooks: [],
        srchRes: [],
        currentBook: null,
        bookJustLoaded: null,
        addBook_status: "idle",
        getBooks_status: "idle",
        srchBooks_status: "idle",
        myBooks_status: "idle",
        error: null
    },

    reducers: {
        myBooks: (state, action) => {
            const user_ID = action.payload
            if (user_ID) {
                state.userBooks = state.books.filter(item =>
                    item.userID?._id === user_ID
                    )
                    state.myBooks_status = "succeeded"
                    console.log("getBooks work")
            }
            else {
                state.userBooks = []
                state.myBooks_status = "failed"

                console.log("getBooks not work")

            }

        }
    },


    extraReducers(builder) {
        builder
            // add
            .addCase(addBook.pending, (state, action) => {
                state.addBook_status = 'loading'
                console.log(state.status)
            })

            .addCase(addBook.fulfilled, (state, action) => {

                if (action.payload) {
                    state.addBook_status = 'succeeded';
                    state.error = null;
                    state.books.push(action.payload)
                    state.bookJustLoaded = action.payload

                    console.log(action.payload)
                    console.log(state.addBook_status)
                }
            })

            .addCase(addBook.rejected, (state, action) => {
                state.addBook_status = 'failed'
                state.error = action.error
                console.log("here_error_msg", state.error)
            })
            // get
            .addCase(getBooks.pending, (state, action) => {
                state.getBooks_status = 'loading'
                console.log(state.getBooks_status)

            })

            .addCase(getBooks.fulfilled, (state, action) => {

                if (action.payload) {
                    state.getBooks_status = 'succeeded';
                    state.error = null;
                    state.books = action.payload

                    console.log(action.payload)
                    console.log(state.getBooks_status)

                }
            })

            .addCase(getBooks.rejected, (state, action) => {
                state.getBooks_status = 'failed'
                state.error = action.error
                console.log("here_error_msg", state.error)
            })
            // search
            .addCase(srchBooks.pending, (state, action) => {
                state.srchBooks_status = 'loading'
                console.log(state.srchBooks_status)

            })

            .addCase(srchBooks.fulfilled, (state, action) => {

                if (action.payload) {
                    state.srchBooks_status = 'succeeded';
                    state.error = null;
                    state.srchRes = action.payload

                    console.log(action.payload)
                    console.log(state.srchBooks_status)

                }
                else {
                    state.srchRes = []
                }
            })

            .addCase(srchBooks.rejected, (state, action) => {
                state.srchBooks_status = 'failed'
                state.error = action.error
                console.log("here_error_msg", state.error)
            })


    }
})


export const addBookStatus = (state) => state.books.addBook_status
export const myBooksStatus = (state) => state.books.myBooks_status
export const getAllBooks = (state) => state.books.books
export const getMyBooks = (state) => state.books.userBooks
export const books = (state) => state.books

export const { myBooks } = booksSlice.actions
export default booksSlice.reducer;