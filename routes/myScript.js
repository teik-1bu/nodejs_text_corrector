var pythonBridge = require('python-bridge');
var python = pythonBridge();

python.ex`import sys`
python.ex`sys.path.append('E:\\Deep Learning\\deep-text-corrector-master\\deep-text-corrector-master')`
python.ex`import os`;
python.ex`import numpy as np`;
python.ex`import tensorflow as tf`;
python.ex`from correct_text import train, decode, decode_sentence, evaluate_accuracy, create_model,\
get_corrective_tokens, DefaultPTBConfig, DefaultMovieDialogConfig`;
python.ex`from text_corrector_data_readers import PTBDataReader, MovieDialogReader`;

python.ex`root_data_path = "E:/Deep Learning/deep-text-corrector-master/deep-text-corrector-master/"`;
python.ex`train_path = os.path.join(root_data_path, "movie_dialog_train.txt")`;
python.ex`val_path = os.path.join(root_data_path, "movie_dialog_val.txt")`;
python.ex`test_path = os.path.join(root_data_path, "movie_dialog_test.txt")`;
python.ex`model_path = os.path.join(root_data_path, "movie_dialog_model")`;
python.ex`config = DefaultMovieDialogConfig()`;

python.ex`data_reader = MovieDialogReader(config, train_path, dropout_prob=0.25, replacement_prob=0.25, dataset_copies=1)`;
python.ex`corrective_tokens = get_corrective_tokens(data_reader, train_path)`;
python.ex`import pickle`;
python.ex`with open(os.path.join(root_data_path, "corrective_tokens.pickle"), "wb") as f:
                pickle.dump(corrective_tokens, f)`
python.ex`import pickle`;
python.ex`with open(os.path.join(root_data_path, "token_to_id.pickle"), "wb") as f:
                pickle.dump(data_reader.token_to_id, f)`;
python.ex`sess = tf.InteractiveSession()`;
python.ex`model = create_model(sess, True, model_path, config=config)`;

module.exports = python;