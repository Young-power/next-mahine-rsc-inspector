export function useTimer() {
  const start = Date.now()

  return {
    end() {
      return Date.now() - start
    }
  }
}
