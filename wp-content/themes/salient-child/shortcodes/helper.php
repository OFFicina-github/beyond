<?php
/**
 * Helper condiviso per gli shortcode evento.
 * Normalizza un campo immagine ACF che può essere array o URL stringa.
 *
 * @param  mixed  $raw          Valore restituito da get_field() per un campo immagine.
 * @param  string $fallback_alt Alt text di fallback.
 * @return array|null           ['url' => ..., 'alt' => ...] oppure null se vuoto.
 */
function _bp_resolve_img($raw, $fallback_alt = '') {
    if (is_array($raw) && !empty($raw['url'])) {
        return ['url' => $raw['url'], 'alt' => $raw['alt'] ?: $fallback_alt];
    }
    if (!empty($raw) && is_string($raw)) {
        return ['url' => $raw, 'alt' => $fallback_alt];
    }
    return null;
}
