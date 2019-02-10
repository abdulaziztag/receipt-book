import * as fb from 'firebase'

class Image {
  constructor (imageUrl, title) {
    this.imageUrl = imageUrl
    this.title = title
  }
}

class Receipt {
  constructor (
    ownerId,
    title,
    ingred,
    interest,
    meth,
    imageSrc = '',
    id = null
  ) {
    this.ownerId = ownerId
    this.title = title
    this.ingred = ingred
    this.interest = interest
    this.meth = meth
    this.imageSrc = imageSrc
    this.id = id
  }
}

export default {
  state: {
    receipts: [],
    flag: true,
    counter: 1,
    errReceipts: [],
    imageArr: []
  },
  mutations: {
    createReceipt (state, payload) {
      state.receipts.push(payload)
    },
    loadReceipts (state, payload) {
      state.receipts = state.receipts.concat(payload)
    },
    errReceipts (state, payload) {
      state.errReceipts = payload
    },
    loadImages (state, payload) {
      state.imageArr = payload
    }
  },
  actions: {
    async createReceipt ({ commit, getters }, payload) {
      commit('clearError')
      commit('setLoading', true)

      const image = payload.image

      try {
        const newReceipt = new Receipt(
          getters.user.id,
          payload.title,
          payload.ingred,
          payload.meth,
          payload.interest,
          ''
        )

        const receipt = await fb.database().ref('receipts').push(newReceipt)
        const imageExt = image.name.slice(image.name.lastIndexOf('.'))

        const imageSrc = await fb.storage().ref().child(`receipts/${receipt.key}${imageExt}`).put(image)
          .then(({ ref }) => ref.getDownloadURL())

        await fb.database().ref('receipts').child(receipt.key).update({
          imageSrc
        })

        commit('setLoading', false)
        commit('createReceipt', {
          ...newReceipt,
          id: receipt.key,
          imageSrc
        })
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async fetchImages ({commit}) {
      commit('clearError')
      commit('setLoading3', true)

      const resultImageUrls = []
      try {
        const fbVal = await fb.database().ref('images').once('value')
        const images = fbVal.val()
        Object.keys(images).forEach(function (key) {
          const image = images[key]
          resultImageUrls.push(
            new Image(
              image.url,
              image.title
            )
          )
        })
        commit('loadImages', resultImageUrls)
        commit('setLoading3', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading3', false)
        throw error
      }
    },
    async fetchReceipts ({commit}) {
      commit('clearError')
      commit('setLoading', true)
      const resultReceipts = []
      try {
        const fbVal = await fb.database().ref('receipts').once('value')
        const receipts = fbVal.val()
        const arr = Object.keys(receipts).reverse()
        for (let i = 0; i < 6; i++) {
          const receipt = receipts[arr[i]]
          resultReceipts.push(
            new Receipt(
              receipt.ownerId,
              receipt.title,
              receipt.ingred,
              receipt.interest,
              receipt.meth,
              receipt.imageSrc, arr[i]
            )
          )
        }
        commit('loadReceipts', resultReceipts)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async loopDownload ({commit, state}) {
      let counter = state.counter++
      let flag = state.flag
      commit('clearError')
      if (flag === true) {
        commit('setLoading2', true)
      }
      const resultReceipts = []
      try {
        const fbVal = await fb.database().ref('receipts').once('value')
        const receipts = fbVal.val()
        const arr = Object.keys(receipts).reverse()
        for (let i = counter * 6; i < (counter + 1) * 6; i++) {
          if (i < arr.length) {
            const receipt = receipts[arr[i]]
            resultReceipts.push(
              new Receipt(
                receipt.ownerId,
                receipt.title,
                receipt.ingred,
                receipt.interest,
                receipt.meth,
                receipt.imageSrc, arr[i]
              )
            )
          } else {
            if (flag === true) {
              state.flag = false
              commit('setLoading2', false)
            }
          }
        }
        commit('loadReceipts', resultReceipts)
        commit('setLoading2', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading2', false)
        throw error
      }
    },
    async for404err ({commit}) {
      commit('clearError')
      const resultReceipts = []
      try {
        const fbVal = await fb.database().ref('receipts').once('value')
        const receipts = fbVal.val()
        const arr = Object.keys(receipts).reverse()
        const randomList = []
        for (let i = 0; i < 4; i++) {
          let random = Math.floor(Math.random() * arr.length)
          randomList.push(random)
          randomList.forEach(function (key) {
            if (key === random) {
              while (key !== random) {
                random = Math.floor(Math.random() * arr.length)
              }
            }
          })
          const randomId = arr[random]
          const receipt = receipts[randomId]
          resultReceipts.push(
            new Receipt(
              receipt.ownerId,
              receipt.title,
              receipt.ingred,
              receipt.interest,
              receipt.meth,
              receipt.imageSrc, randomId
            )
          )
        }
        commit('errReceipts', resultReceipts)
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    }
  },
  getters: {
    receipts (state) {
      return state.receipts
    },
    allReceipts (state) {
      return state.errReceipts
    },
    myReceipts (state, getters) {
      return state.receipts.filter(receipt => {
        return receipt.ownerId === getters.user.id
      })
    },
    loadImages (state) {
      return state.imageArr
    },
    flag (state) {
      return state.flag
    },
    links (state) {
      return state.links
    },
    adById (state) {
      return adId => {
        //eslint-disable-next-line
        return state.receipts.find(ad => ad.id == adId)
      }
    }
  }
}
