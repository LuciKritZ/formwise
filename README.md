# Formwise

A powerful drag-and-drop AI-powered form builder built with React and Next.js.

## Features

- Drag & drop form elements from sidebar to builder
- Reorder form fields easily
- Live preview of form fields
- Save and load form locally in browser
- Built with React, Next.js (App Router), and @dnd-kit for drag-and-drop
- TypeScript for type safety

## Installation

```bash
git clone https://github.com/LuciKritZ/formwise.git
cd formwise
npm install
npm run dev
```

## Usage

1. Sidebar se form elements ko drag karke **Form Builder** area mein drop karo.
2. Form Builder mein added fields ko drag karke order change kar sakte ho.
3. Right side ka **Preview Panel** se apne form ka live preview dekh sakte ho.
4. **Save Form** button se form localStorage mein save kar lo.
5. **Load Form** button se saved form ko wapas load kar sakte ho.

## Roadmap v1

- [x] Core drag-and-drop functionality using dnd-kit
- [x] Sidebar with draggable form elements (Text Input, Checkbox, Select)
- [x] Form builder area with reorderable fields
- [x] Live preview panel reflecting form fields
- [x] Save/load form to/from localStorage
- [ ] Add field validation options
- [ ] Export form JSON schema
- [ ] Integration with AI to auto-generate fields from prompts
- [ ] Responsive mobile-friendly design
- [ ] Theming and UI improvements (shadcn/ui integration)

## Contributing

Feel free to open issues or submit pull requests.
Please follow the code style and add meaningful commit messages.

## License

This project is licensed under the MIT License.
