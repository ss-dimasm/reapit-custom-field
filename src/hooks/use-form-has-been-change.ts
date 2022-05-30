import { useState } from 'react'

type formChangeType = {
  [val in string]: boolean
}

const isFormChange: formChangeType = {}

// user buat custom form builder dan udah drag salah satu field ke drop zone
// useFormHasBeenChange bakal kebuat berdasarkan id form ketika udah pertama kali kebuat
// custom hook ini nanti dipanggil di parent

// case
// kalau dia udah ketrack di isFormChange, maka langsung return
//  kalau dia belum ke track, maka daftarin dulu baru return
export const useFormHasBeenChange = (key: string) => {
  const [isFormHasBeenChange, setIsFormHasBeenChange] = useState<boolean>(false)

  if (!isFormChange[key]) {
    isFormChange[key] = true
    setIsFormHasBeenChange(true)
  }

  // register
  return { isFormChange: isFormHasBeenChange }
}
