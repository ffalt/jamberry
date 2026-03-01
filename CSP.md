# Content Security Policy (CSP) Configuration

## Current Implementation

Jamserve deploys CSP headers. A CSP meta tag is added to `src/index.html` as a fallback security measure.

### CSP Directives Explained

```
default-src 'self';
```
- Default policy: only load resources from the same origin

```
script-src 'self' 'unsafe-inline';
```
- Scripts from same origin
- `'unsafe-inline'` required for:
  - Angular inline scripts during bootstrap
  - SoundManager2 inline initialization
  - **TODO**: Remove `'unsafe-inline'` by using nonces or hashes

```
style-src 'self' 'unsafe-inline';
```
- Styles from same origin and inline styles
- `'unsafe-inline'` required for:
  - Angular component styles
  - Dynamic theme changes
  - **TODO**: Consider using nonces for better security

```
img-src 'self' data: blob: https:;
```
- Images from same origin, data URIs, blob URLs, and any HTTPS source
- `data:` required for base64-encoded images (artwork, avatars)
- `blob:` required for image cropper and local image processing
- `https:` allows loading album art from external sources

```
media-src 'self' blob: https:;
```
- Audio/video from same origin, blob URLs, and HTTPS sources
- `blob:` required for audio streaming via SoundManager2
- `https:` allows streaming from configured Jamserve backend

```
connect-src 'self' https: wss:;
```
- API calls to same origin and any HTTPS/WSS endpoints
- Required for connecting to Jamserve backend (user-configurable)
- `wss:` for potential WebSocket support

```
font-src 'self' data:;
```
- Fonts from same origin and data URIs
- `data:` for inline font definitions

```
object-src 'none';
```
- Blocks all plugins (Flash, Java, etc.)

```
base-uri 'self';
```
- Restricts `<base>` tag to same origin (prevents base tag injection)

```
form-action 'self';
```
- Forms can only submit to same origin

```
frame-ancestors 'none';
```
- Prevents page from being embedded in frames/iframes (clickjacking protection)

```
upgrade-insecure-requests;
```
- Automatically upgrades HTTP requests to HTTPS when possible
