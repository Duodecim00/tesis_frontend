import { create } from 'zustand'

const useStore = create((set) => ({
  count: 1,
  openpdf:false,
  inc: () => set((state) => ({ count: state.count + 1 })),
  open:()=>{
    if (open == false) {
      set(() => ({ openpdf: true}))
    }else{
      set(() => ({ openpdf: false}))
    }
  }
}))

export default useStore