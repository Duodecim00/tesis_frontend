import { create } from 'zustand'

const useStore = create((set) => ({
  count: 1,
  openpdf:false,
  dialog:false,
  id: "",
  grade:false,
  student:false,
  teacher:false,
  inc: () => set((state) => ({ count: state.count + 1 })),
  OpenDialog: () => set((state) => ({ dialog: true })),
  CloseDialog: () => set((state) => ({ dialog: false })),
  SetID: (id) => set(() => ({ id: id })),
  DeleteGradeTrue: () => set(() => ({ grade: true })),
  DeleteStudentTrue: () => set(() => ({ student: true })),
  DeleteTeacherTrue: () => set(() => ({ teacher: true })),
  DeleteGradeFalse: () => set(() => ({ grade: false })),
  DeleteStudentFalse: () => set(() => ({ student: false })),
  DeleteTeacherFalse: () => set(() => ({ teacher: false })),
}))

export default useStore