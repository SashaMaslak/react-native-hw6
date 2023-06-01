// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app"
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth"
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore"
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage"
import {
	getReactNativePersistence,
	initializeAuth,
} from "firebase/auth/react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

const firebaseConfig = {
	apiKey: "AIzaSyBeKoO3PcEnm_G7ih8pR8BBhAZYB6gS2e0",
	authDomain: "rn-hw-project-24639.firebaseapp.com",
	projectId: "rn-hw-project-24639",
	storageBucket: "rn-hw-project-24639.appspot.com",
	messagingSenderId: "144184344729",
	appId: "1:144184344729:web:4a75311c7b1eb7310ab808",
	measurementId: "G-87SW3TEJDG",
}

const app = initializeApp(firebaseConfig)

//export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(AsyncStorage),
})
