import { useState, useEffect } from 'react';


//! Хук useLocalStorage:
//! 1. Хранит State,
//! 2. Инициализирует State из localStorage при первом RENDER
//! 3. Каждый раз обновляет localStorage при обновлении State,
//* Если localStorage = null, записываем в contacts = []
//* lazy state initialization contacts

export default function useLocalStorage(key, defaultValue) {
  const [state, setState] = useState(() => {
    return JSON.parse(localStorage.getItem(key)) ?? defaultValue
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
