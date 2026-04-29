export function isNumericIdentifier(value) {
  return /^[0-9]+$/.test(String(value ?? "").trim());
}

export function isFarmaciaProfile(profile) {
  const esFarmacia =
    profile?.esfarmacia === true ||
    profile?.esfarmacia === "true" ||
    profile?.esfarmacia === "s" ||
    profile?.esfarmacia === 1;

  return Boolean(
    esFarmacia ||
      profile?.farmaciaid ||
      profile?.matricula ||
      profile?.cufe ||
      profile?.cuit ||
      Array.isArray(profile?.instituciones) ||
      Array.isArray(profile?.nro_cuenta_drogueria) ||
      Array.isArray(profile?.nro_cuenta_laboratorio)
  );
}

export function getAssociatedFarmaciaId(profile) {
  return (
    profile?.farmaciaid ||
    profile?.farmaciaId ||
    profile?.id_wp ||
    profile?.farmacia_id ||
    profile?.idFarmacia
  );
}

export function getFarmaciaLookupIdentifier(farmacia, userprofile, fallback) {
  return (
    farmacia?.usuario ||
    farmacia?.farmaciaid ||
    farmacia?.farmaciaId ||
    farmacia?.id_wp ||
    userprofile?.farmaciaid ||
    userprofile?.farmaciaId ||
    userprofile?.id_wp ||
    userprofile?.farmacia_id ||
    userprofile?.idFarmacia ||
    fallback
  );
}
