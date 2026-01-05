# Gemini Model Names - Quick Reference

If you're getting "Model not found" errors, try these model names in order:

## Current Working Models (2024)

1. **gemini-2.0-flash-exp** (Latest experimental - currently set in code)
2. **gemini-2.5-flash** (Latest stable flash model)
3. **gemini-2.5-pro** (Latest stable pro model)
4. **gemini-1.5-flash** (Previous generation)
5. **gemini-1.5-pro** (Previous generation)
6. **gemini-pro** (Original - most compatible)

## How to Change Model

Edit `src/lib/gemini.ts` line 44 and change:

```typescript
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
```

To one of the models above, for example:

```typescript
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
```

## Important Notes

- **API Key Type Matters**: 
  - Google AI Studio keys (from makersuite.google.com) work with most models
  - Google Cloud Console keys might have different model access
  
- **Model Availability**:
  - Some models are region-specific
  - Some require specific API permissions
  - Newer models might not be available in all regions yet

## If None Work

1. Check your API key is from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Verify the Generative Language API is enabled
3. Try generating a new API key
4. Check [Google's Model List](https://ai.google.dev/api/models) for latest available models
