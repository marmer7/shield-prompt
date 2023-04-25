export function addMaskListeners(matches: any[]) {
  matches.forEach((_, index) => {
    const goodAction = document.getElementById(`good-${index}`);
    const badAction = document.getElementById(`bad-${index}`);

    goodAction?.addEventListener("click", () => {
      console.log(`Looks Good action clicked for item ${index}`);
    });

    badAction?.addEventListener("click", () => {
      console.log(`Replace action clicked for item ${index}`);
    });
  });
}
