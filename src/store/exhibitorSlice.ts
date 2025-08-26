import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { ExhibitorData } from '@/types'
import { incrementApiCallCount } from '@/lib/api-call-tracker'

// Async thunk for fetching exhibitors
export const fetchExhibitors = createAsyncThunk(
  'exhibitors/fetchExhibitors',
  async (_, { rejectWithValue }) => {
    try {
      const apiCallNumber = incrementApiCallCount()
      console.log(`🚀 Redux: Making API call #${apiCallNumber}`)

      const primaryUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "https://opexn-expo.onrender.com/api/startup"
      const backupUrl = process.env.NEXT_PUBLIC_BACKUP_URL || "http://localhost:8000/api/startup"

      console.log('🔗 Redux: Trying primary API URL:', primaryUrl)

      let response;
      let apiSource = 'primary';

      try {
        response = await axios.get<ExhibitorData[]>(primaryUrl, {
          timeout: 8000,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        })
      } catch (primaryError) {
        console.log('⚠️ Redux: Primary API failed, trying backup URL:', backupUrl)

        try {
          response = await axios.get<ExhibitorData[]>(backupUrl, {
            timeout: 5000,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
          })
          apiSource = 'backup';
        } catch (backupError) {
          console.log('❌ Redux: Both primary and backup APIs failed')
          throw primaryError; // Throw the original error for fallback handling
        }
      }

      console.log(`✅ Redux: API Response Status from ${apiSource}:`, response.status)
      console.log('📊 Redux: API Response Data length:', Array.isArray(response.data) ? response.data.length : 'Not an array')

      if (!Array.isArray(response.data)) {
        console.log('⚠️ Redux: API returned invalid format - using fallback data')
        throw new Error('API returned invalid data format - expected an array')
      }

      // If API returns empty data, immediately use fallback
      if (response.data.length === 0) {
        console.log('⚠️ Redux: API returned empty array - immediately using fallback data')

        // Return fallback data directly instead of throwing error
        const fallbackData: ExhibitorData[] = [
          {
            ID: 1,
            name: "TechCorp Solutions",
            banner: "https://res.cloudinary.com/dng61q3lg/image/upload/v1753780471/bannerAgri_mrsukk.jpg",
            logo: "https://res.cloudinary.com/dng61q3lg/image/upload/v1753555568/rtnm_zk88ke.png",
            websiteURL: "https://techcorp.example.com",
            pitchDeck: "https://example.com/pitch.pdf",
            dpiitCertNumber: "DPIIT123456",
            address: {
              ID: 1,
              street: "Tech Park, Sector 5, Electronic City",
              city: "Bangalore",
              state: "Karnataka",
              pincode: "560100"
            },
            director: {
              ID: 1,
              directorName: "John Smith",
              directorEmail: "john.smith@techcorp.com"
            },
            products: [
              {
                ID: 1,
                title: "AI-Powered Analytics Platform",
                description: "Advanced analytics solution using machine learning"
              },
              {
                ID: 2,
                title: "Cloud Infrastructure Service",
                description: "Scalable cloud solutions for enterprises"
              }
            ],
            spoc: {
              ID: 1,
              Name: "Sarah Johnson",
              Email: "sarah.johnson@techcorp.com",
              Phone: "+91-9876543210",
              Position: "Business Development Manager"
            },
            revenueInfo: {
              ID: 1,
              revenueBracket: "₹1Cr–₹10Cr",
              userImpact: 50000
            },
            fundingInfo: {
              ID: 1,
              fundingType: "Series A"
            }
          },
          {
            ID: 2,
            name: "InnovateLab",
            banner: "https://res.cloudinary.com/dng61q3lg/image/upload/v1753780471/bannerAgri_mrsukk.jpg",
            logo: "https://res.cloudinary.com/dng61q3lg/image/upload/v1753555568/rtnm_zk88ke.png",
            websiteURL: "https://innovatelab.example.com",
            pitchDeck: "https://example.com/pitch2.pdf",
            dpiitCertNumber: "DPIIT789012",
            address: {
              ID: 2,
              street: "Innovation Hub, Cyber City",
              city: "Gurgaon",
              state: "Haryana",
              pincode: "122002"
            },
            director: {
              ID: 2,
              directorName: "Priya Patel",
              directorEmail: "priya.patel@innovatelab.com"
            },
            products: [
              {
                ID: 3,
                title: "IoT Monitoring System",
                description: "Real-time monitoring solution for industrial equipment"
              }
            ],
            spoc: {
              ID: 2,
              Name: "Rahul Kumar",
              Email: "rahul.kumar@innovatelab.com",
              Phone: "+91-9876543211",
              Position: "Technical Lead"
            },
            revenueInfo: {
              ID: 2,
              revenueBracket: "₹25L–₹1Cr",
              userImpact: 25000
            },
            fundingInfo: {
              ID: 2,
              fundingType: "Bootstrapped"
            }
          },
          {
            ID: 3,
            name: "GreenTech Innovations",
            banner: "https://res.cloudinary.com/dng61q3lg/image/upload/v1753780471/bannerAgri_mrsukk.jpg",
            logo: "https://res.cloudinary.com/dng61q3lg/image/upload/v1753555568/rtnm_zk88ke.png",
            websiteURL: "https://greentech.example.com",
            pitchDeck: "https://example.com/pitch3.pdf",
            dpiitCertNumber: "DPIIT345678",
            address: {
              ID: 3,
              street: "Green Valley, IT Corridor",
              city: "Chennai",
              state: "Tamil Nadu",
              pincode: "600032"
            },
            director: {
              ID: 3,
              directorName: "Amit Sharma",
              directorEmail: "amit.sharma@greentech.com"
            },
            products: [
              {
                ID: 4,
                title: "Solar Energy Management",
                description: "Smart solar panel monitoring and optimization system"
              },
              {
                ID: 5,
                title: "Waste Management Solution",
                description: "AI-driven waste sorting and recycling platform"
              }
            ],
            spoc: {
              ID: 3,
              Name: "Neha Singh",
              Email: "neha.singh@greentech.com",
              Phone: "+91-9876543212",
              Position: "Product Manager"
            },
            revenueInfo: {
              ID: 3,
              revenueBracket: "₹10Cr+",
              userImpact: 100000
            },
            fundingInfo: {
              ID: 3,
              fundingType: "Series B"
            }
          }
        ];

        console.log('✅ Redux: Using fallback mock data with', fallbackData.length, 'exhibitors')
        return fallbackData;
      }

      console.log('✅ Redux: Successfully loaded real API data')
      return response.data
    } catch (error) {
      console.error('❌ Redux: API Error:', error)

      let errorMessage = 'An unknown error occurred'

      if (error instanceof AxiosError) {
        if (error.code === 'ECONNABORTED') {
          errorMessage = 'Request timeout - API is taking too long to respond'
        } else if (error.response) {
          errorMessage = `API Error: ${error.response.status} - ${error.response.statusText}`
        } else if (error.request) {
          errorMessage = 'Network error - Unable to reach the API server'
        } else {
          errorMessage = error.message || 'Request setup error'
        }
      } else if (error instanceof Error) {
        errorMessage = error.message
      }

    //   console.error('❌ Redux: API failed with error:', errorMessage)
      console.log('🔄 Redux: Switching to fallback mock data due to network/server error')

      // Provide simple fallback for network/server errors
      const networkFallbackData: ExhibitorData[] = [
        {
          ID: 1,
          name: "Demo Company",
          banner: "https://res.cloudinary.com/dng61q3lg/image/upload/v1753780471/bannerAgri_mrsukk.jpg",
          logo: "https://res.cloudinary.com/dng61q3lg/image/upload/v1753555568/rtnm_zk88ke.png",
          websiteURL: "https://demo.example.com",
          pitchDeck: "https://example.com/pitch.pdf",
          dpiitCertNumber: "DPIIT000000",
          address: {
            ID: 1,
            street: "Demo Address",
            city: "Demo City",
            state: "Demo State",
            pincode: "000000"
          },
          director: {
            ID: 1,
            directorName: "Demo Director",
            directorEmail: "demo@example.com"
          },
          products: [
            {
              ID: 1,
              title: "Demo Product",
              description: "Demo product description"
            }
          ],
          spoc: {
            ID: 1,
            Name: "Demo Contact",
            Email: "contact@example.com",
            Phone: "+91-0000000000",
            Position: "Demo Position"
          },
          revenueInfo: {
            ID: 1,
            revenueBracket: "₹0–₹25L",
            userImpact: 1000
          },
          fundingInfo: {
            ID: 1,
            fundingType: "Bootstrapped"
          }
        }
      ];

      console.log('✅ Redux: Using network fallback data with', networkFallbackData.length, 'exhibitor')
      console.log('🔄 Redux: Returning fallback data as successful response')
      return networkFallbackData
    }
  }
)

interface ExhibitorState {
  data: ExhibitorData[]
  loading: boolean
  error: string | null
  lastFetched: number | null
  dataSource: 'api' | 'mock' | 'cache' | null
}

const initialState: ExhibitorState = {
  data: [],
  loading: false,
  error: null,
  lastFetched: null,
  dataSource: null
}

const exhibitorSlice = createSlice({
  name: 'exhibitors',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setDataSource: (state, action: PayloadAction<'api' | 'mock' | 'cache'>) => {
      state.dataSource = action.payload
      console.log(`📍 Redux: Data source set to: ${action.payload}`)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExhibitors.pending, (state) => {
        state.loading = true
        state.error = null
        console.log('⏳ Redux: Fetching exhibitors...')
      })
      .addCase(fetchExhibitors.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.lastFetched = Date.now()
        state.error = null

        // Determine data source based on the data
        if (action.payload.length > 0 && action.payload[0]?.name === "TechCorp Solutions") {
          state.dataSource = 'mock'
          console.log(`✅ Redux: Successfully loaded ${action.payload.length} exhibitors from fallback mock data`)
        } else {
          state.dataSource = 'api'
          console.log(`✅ Redux: Successfully loaded ${action.payload.length} exhibitors from API`)
        }
      })
      .addCase(fetchExhibitors.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch exhibitors'
        // Keep existing data if available, otherwise keep empty array
        console.log('❌ Redux: Failed to fetch exhibitors:', action.error.message)
        console.log('📊 Redux: Current data count after failure:', state.data.length)
      })
  }
})

export const { clearError, setDataSource } = exhibitorSlice.actions
export default exhibitorSlice.reducer
