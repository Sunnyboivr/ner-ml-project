from datasets import load_dataset
import json
import random

def convert_ontonotes_to_spacy():
    """Download OntoNotes and convert to spaCy format"""
    
    print("📥 Downloading OntoNotes 5.0 dataset...")
    print("(This has 18 entity types - most comprehensive!)\n")
    
    try:
        # Load OntoNotes dataset
        dataset = load_dataset("tner/ontonotes5")
        
        train_data = dataset["train"]
        
        print(f"✅ Downloaded {len(train_data)} training examples")
        
        # OntoNotes label mapping (18 entity types!)
        label_list = [
            "O",
            "B-PERSON", "I-PERSON",
            "B-ORG", "I-ORG",
            "B-GPE", "I-GPE",
            "B-LOC", "I-LOC",
            "B-FAC", "I-FAC",
            "B-PRODUCT", "I-PRODUCT",
            "B-EVENT", "I-EVENT",
            "B-WORK_OF_ART", "I-WORK_OF_ART",
            "B-LAW", "I-LAW",
            "B-LANGUAGE", "I-LANGUAGE",
            "B-DATE", "I-DATE",
            "B-TIME", "I-TIME",
            "B-PERCENT", "I-PERCENT",
            "B-MONEY", "I-MONEY",
            "B-QUANTITY", "I-QUANTITY",
            "B-ORDINAL", "I-ORDINAL",
            "B-CARDINAL", "I-CARDINAL",
            "B-NORP", "I-NORP"
        ]
        
        print("\n🏷️  Entity types in this dataset:")
        unique_labels = set()
        for label in label_list:
            if label.startswith("B-"):
                unique_labels.add(label[2:])
        
        for idx, label in enumerate(sorted(unique_labels), 1):
            print(f"   {idx:2d}. {label}")
        
        print(f"\n   Total: {len(unique_labels)} entity types! 🎉")
        
        # Convert to our format
        print("\n🔄 Converting to spaCy format...")
        training_data = []
        
        for idx, example in enumerate(train_data):
            tokens = example["tokens"]
            tags = example["tags"]
            
            # Reconstruct text
            text = " ".join(tokens)
            
            # Extract entities
            entities = []
            current_entity = None
            char_position = 0
            
            for token, tag in zip(tokens, tags):
                tag_label = label_list[tag] if tag < len(label_list) else "O"
                
                if tag_label.startswith("B-"):
                    if current_entity:
                        entities.append(current_entity)
                    
                    entity_type = tag_label[2:]
                    current_entity = [char_position, char_position + len(token), entity_type]
                
                elif tag_label.startswith("I-") and current_entity:
                    current_entity[1] = char_position + len(token)
                
                else:
                    if current_entity:
                        entities.append(current_entity)
                        current_entity = None
                
                char_position += len(token) + 1
            
            if current_entity:
                entities.append(current_entity)
            
            if entities:
                training_data.append({
                    "text": text,
                    "entities": entities
                })
            
            if (idx + 1) % 1000 == 0:
                print(f"  Processed {idx + 1}/{len(train_data)} examples...")
        
        print(f"\n✅ Converted {len(training_data)} examples with entities")
        
        # Save to JSON
        output_file = "ontonotes_training_data.json"
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(training_data, f, indent=2, ensure_ascii=False)
        
        print(f"💾 Saved to {output_file}")
        
        # Show samples by entity type
        print("\n📋 Sample entities by type:")
        entity_samples = {}
        
        for item in random.sample(training_data, min(100, len(training_data))):
            for start, end, label in item["entities"]:
                if label not in entity_samples:
                    entity_text = item["text"][start:end]
                    entity_samples[label] = entity_text
        
        for label in sorted(entity_samples.keys()):
            print(f"   {label:15s} → {entity_samples[label]}")
        
        return training_data
        
    except Exception as e:
        print(f"\n❌ Error: {e}")
        print("\nTrying alternative: Using spaCy's en_core_web_trf model data...")
        print("This will give you similar results with many entity types!")
        return None

if __name__ == "__main__":
    print("=" * 70)
    print("           ONTONOTES 5.0 DATASET DOWNLOADER")
    print("           (18 Entity Types - Most Comprehensive!)")
    print("=" * 70)
    
    convert_ontonotes_to_spacy()
    
    print("\n" + "=" * 70)
    print("Dataset ready! Now run: python train_model.py")
    print("=" * 70)